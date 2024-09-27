import axios, { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    const network = localStorage.getItem('network') || 'Mainnet';
    return network === 'Devnet'
      ? process.env.NEXT_PUBLIC_DEVNET_API_BASE_URL
      : process.env.NEXT_PUBLIC_MAINNET_API_BASE_URL;
  }
  return process.env.NEXT_PUBLIC_MAINNET_API_BASE_URL;
};

export const mainnetAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVNET_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

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

export const useNetwork = () => {
  const [network, setNetwork] = useState('Mainnet');

  useEffect(() => {
    const savedNetwork = localStorage.getItem('network') || 'Mainnet';
    setNetwork(savedNetwork);
    setBaseURL(savedNetwork);
  }, []);

  const changeNetwork = (newNetwork: string) => {
    setNetwork(newNetwork);
    localStorage.setItem('network', newNetwork);
    setBaseURL(newNetwork);
    window.location.reload();
  };

  return { network, changeNetwork };
};

export default axiosInstance;
