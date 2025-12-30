interface IpInfo {
  ip: string;
  country: string;
}
let infoData: IpInfo | null = null;

export const useLocation = async () => {
  const config = useRuntimeConfig();
  const ipInfoKey = config.public.ipInfo;
  try {
    if (infoData) {
      return infoData;
    }
    const { data, error } = await useFetch<IpInfo>(`https://ipinfo.io/json?token=${ipInfoKey}`);
    infoData = data.value;
    if (error.value) {
      console.error('Error fetching IP info:', error.value);
      return;
    }
    return infoData;
  } catch (err) {
    console.error('Failed to fetch country from IP:', err);
    return null;
  }
};
