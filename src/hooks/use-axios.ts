import {useEffect, useState} from 'react';
import {AxiosRequestConfig} from 'axios';
import {API} from '@lib/API';

const useAxios = <T>(configParams: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchDataUsingAxios(configParams);
  }, []);
  const fetchDataUsingAxios = async (configParams: AxiosRequestConfig) => {
    await API()
      .request<T>(configParams)
      .then(res => setData(res.data))
      .catch(err => {
        setIsLoading(false);
        setIsError(true);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };

  return [data, isError, isLoading];
};

export default useAxios;
