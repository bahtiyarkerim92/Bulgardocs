interface ProfileData {
  fullName: string;
  email: string;
  gender: string;
  birthday: string;
  address: string;
  nationalIdNumber?: string;
  insurance?: {
    type: string;
    company: string;
    number: string;
  };
}

export const useProfile = () => {
  const profileData = ref<ProfileData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfile = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Using $fetch instead of fetch to automatically handle auth headers
      profileData.value = await $fetch<ProfileData>('/auth/profile', {
        method: 'GET',
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Profile fetch error:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    profileData,
    loading,
    error,
    fetchProfile,
  };
}; 