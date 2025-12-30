export const useCrossDomainAuth = () => {
  const checkPatientAppAuth = async (): Promise<boolean> => {
    try {
      const patientAppUrl = process.env.NODE_ENV === 'production'
        ? 'https://patient.bulgardocs.com'
        : 'http://localhost:5173';

      // Try to check auth status on patient app domain
      const response = await fetch(`${patientAppUrl}/api/auth/status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return !!data.accessToken;
      }

      return false;
    } catch (error) {
      // Cross-origin request might be blocked, that's expected
      console.log('Cross-domain auth check failed (expected for different domains):', error);
      return false;
    }
  };

  const redirectToPatientApp = () => {
    const patientAppUrl = process.env.NODE_ENV === 'production'
      ? 'https://patient.bulgardocs.com'
      : 'http://localhost:5173';
    window.location.href = patientAppUrl;
  };

  return {
    checkPatientAppAuth,
    redirectToPatientApp
  };
}; 