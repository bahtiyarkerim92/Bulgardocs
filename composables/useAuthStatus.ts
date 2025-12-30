export const useAuthStatus = async (url) => {

  const baseUrl = url

  try {
    const { data, error, refresh } = await useAsyncData('uniq', async() =>{
        const rest = await $fetch(`${baseUrl}/auth/status`, {credentials: 'include'})
        return rest
    });

    if (!data.value || !error.value) {
      await refresh();
    }

    return { data: data.value, error: error.value };
  } catch (err) {
    console.error('Error fetching auth status:', err);
    return { data: null, error: err };
  }
};
