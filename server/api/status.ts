export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig();
  
  try {
    // Try to reach the backend API directly
    const backendUrl = config.public.baseUrl;
    const response = await $fetch(`${backendUrl}/api/auth/status`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      frontend: 'Connected',
      backend: 'Connected',
      backendUrl,
      data: response,
      message: 'API status check completed'
    };
  } catch (error) {
    console.error('Backend connection failed:', error);
    return {
      success: false,
      frontend: 'Connected', 
      backend: 'Disconnected',
      backendUrl: config.public.baseUrl,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Backend connection failed - using demo data'
    };
  }
}); 