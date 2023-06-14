import {useEffect, useState} from 'react';
import {API} from '@lib/API';
import {IDonationThemesResponse} from '@models/APIModels';
import {APP_URLS} from '@utilities/constants';

const useGetDonationThemes = () => {
  const [data, setData] = useState<IDonationThemesResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await API()
      .get<IDonationThemesResponse[]>(APP_URLS.GET_DONATION_THEMES)
      .then(res => setData(res.data))
      .catch(err => {
        setIsError(true);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };

  return {data, isError, isLoading};
};

export default useGetDonationThemes;
