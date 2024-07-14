import axios, { AxiosInstance } from 'axios';

const getBaseURL = () => {
  const network = localStorage.getItem('network') || 'Mainnet';
  return network === 'Devnet'
    ? process.env.NEXT_PUBLIC_DEVNET_API_BASE_URL
    : process.env.NEXT_PUBLIC_MAINNET_API_BASE_URL;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

export const setBaseURL = (network: string) => {
  const baseURL = network === 'Devnet'
    ? process.env.NEXT_PUBLIC_DEVNET_API_BASE_URL!
    : process.env.NEXT_PUBLIC_MAINNET_API_BASE_URL!;
  axiosInstance.defaults.baseURL = baseURL;
};

export default axiosInstance;
