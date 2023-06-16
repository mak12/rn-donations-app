import {useEffect, useState} from 'react';
import {API} from '@lib/API';
import {IDonationsResponse} from '@models/APIModels';
import {APP_URLS} from '@utilities/constants';
import {showAlertDialog} from '@utilities/utils';

const useGetDonations = () => {
  const [data, setData] = useState<IDonationsResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async () => {
    await API()
      .get<IDonationsResponse[]>(APP_URLS.GET_DONATIONS)
      .then(res => setData(res.data))
      .catch(err => {
        setIsError(true);
        setData(null);
        showAlertDialog('Some error occurred, Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  return {data, isError, isLoading, fetchData};
};

export default useGetDonations;
