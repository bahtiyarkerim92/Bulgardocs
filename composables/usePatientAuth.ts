import { jwtDecode } from 'jwt-decode'

interface PatientTokenPayload {
  userId: string
  jti: string
  iat: number
  exp: number
}

export const usePatientAuth = () => {
  // Get patient app URLs based on environment
  const getPatientAppUrl = () => {
    if (import.meta.client) {
      // Check if we're on localhost
      if (window.location.hostname === 'localhost') {
        return 'http://localhost:5173'
      }
    }
    return 'https://patient.bulgardocs.com'
  }

  // Check if patient is logged in by validating the token cookie
  const isPatientLoggedIn = (): boolean => {
    // Always return false during SSR
    if (!import.meta.client) return false

    try {
      // First try to get token using Nuxt's useCookie
      let token: string | null = useCookie('refreshToken', {
        default: () => null,
        secure: false,
        sameSite: 'lax',
        httpOnly: false
      }).value

      // Fallback: manually check document.cookie if useCookie fails
      if (!token && typeof document !== 'undefined') {
        const cookies = document.cookie.split(';')
        const refreshTokenCookie = cookies.find(cookie => 
          cookie.trim().startsWith('refreshToken=')
        )
        if (refreshTokenCookie) {
          token = refreshTokenCookie.split('=')[1] || null
        }
      }

      if (import.meta.client) {
        console.log('🍪 Patient refresh token:', token ? 'exists' : 'not found')
        console.log('🍪 All cookies:', document.cookie)
      }
      
      if (!token) return false

      // Decode and validate JWT token
      const decoded = jwtDecode<PatientTokenPayload>(token)
      const currentTime = Date.now() / 1000

      if (import.meta.client) {
        console.log('🔍 Token decoded:', { userId: decoded.userId, exp: decoded.exp, current: currentTime })
      }

      // Check if token is expired
      if (decoded.exp < currentTime) {
        if (import.meta.client) {
          console.log('🔍 Token expired, removing...')
        }
        // Remove expired token
        const tokenCookie = useCookie('refreshToken')
        tokenCookie.value = null
        return false
      }

      if (import.meta.client) {
        console.log('✅ Patient is authenticated!')
      }
      return true
    } catch (error) {
      if (import.meta.client) {
        console.error('❌ Error validating patient token:', error)
      }
      // Remove invalid token
      try {
        const tokenCookie = useCookie('refreshToken')
        tokenCookie.value = null
      } catch (cookieError) {
        // Ignore cookie errors during SSR
      }
      return false
    }
  }

  // Redirect to patient app login
  const redirectToPatientLogin = () => {
    if (import.meta.client) {
      const patientAppUrl = getPatientAppUrl()
      window.location.href = `${patientAppUrl}/`
    }
  }

  // Redirect to patient app register
  const redirectToPatientRegister = () => {
    if (import.meta.client) {
      const patientAppUrl = getPatientAppUrl()
      window.location.href = `${patientAppUrl}/?register=true`
    }
  }

  // Redirect to patient dashboard (stays in web app)
  const redirectToPatientDashboard = () => {
    if (import.meta.client) {
      navigateTo('/appointments')
    }
  }

  return {
    isPatientLoggedIn,
    redirectToPatientLogin,
    redirectToPatientRegister,
    redirectToPatientDashboard
  }
} 