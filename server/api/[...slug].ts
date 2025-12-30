export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = getMethod(event);
  const path = getRouterParam(event, 'slug');
  const query = getQuery(event);
  const headers = getRequestHeaders(event);
  
  // Build the target URL
  const targetUrl = `${config.public.baseUrl}/api/${Array.isArray(path) ? path.join('/') : path}`;
  
  try {
    // Handle different HTTP methods
    const options: Record<string, unknown> = {
      method,
      headers: {
        ...headers,
        host: undefined, // Remove host header to avoid conflicts
      },
      query,
    };

    // Add body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = await readBody(event);
    }

    const response = await $fetch(targetUrl, options);
    return response;
  } catch (error: unknown) {
    const errorObj = error as { status?: number; message?: string };
    throw createError({
      statusCode: errorObj.status || 500,
      statusMessage: errorObj.message || 'Backend API Error',
    });
  }
}); 