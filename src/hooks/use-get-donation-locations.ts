import {useEffect, useState} from 'react';
import {API} from '@lib/API';
import {IDonationLocationsResponse} from '@models/APIModels';
import {APP_URLS} from '@utilities/constants';

const useGetDonationLocations = () => {
  const [data, setData] = useState<IDonationLocationsResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await API()
      .get<IDonationLocationsResponse[]>(APP_URLS.GET_DONATION_LOCATIONS)
      .then(res => setData(res.data))
      .catch(err => {
        setIsError(true);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };

  return {data, isError, isLoading};
};

export default useGetDonationLocations;
