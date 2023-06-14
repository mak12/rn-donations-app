import {useEffect, useState} from 'react';
import {API} from '@lib/API';
import {IDonationsResponse} from '@models/APIModels';
import {APP_URLS} from '@utilities/constants';

const useGetDonations = () => {
  const [data, setData] = useState<IDonationsResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchDataUsingAxios();
  }, []);
  const fetchDataUsingAxios = async () => {
    await API()
      .get<IDonationsResponse[]>(APP_URLS.GET_DONATIONS)
      .then(res => setData(res.data))
      .catch(err => {
        setIsError(true);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };

  return [data, isError, isLoading];
};

export default useGetDonations;
