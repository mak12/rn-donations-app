import {useEffect, useState} from 'react';
import {API} from '@lib/API';
import {IDonationStatusesResponse} from '@models/APIModels';
import {APP_URLS} from '@utilities/constants';

const useGetDonationStatuses = () => {
  const [data, setData] = useState<IDonationStatusesResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await API()
      .get<IDonationStatusesResponse[]>(APP_URLS.GET_DONATION_STATUSES)
      .then(res => setData(res.data))
      .catch(err => {
        setIsError(true);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };

  return {data, isError, isLoading};
};

export default useGetDonationStatuses;
