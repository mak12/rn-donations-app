import {useState} from 'react';
import {API} from '@lib/API';
import {IDonationsResponse} from '@models/APIModels';
import {APP_URLS} from '@utilities/constants';
import {showAlertDialog} from '@utilities/utils';
import {useDonationContext} from 'src/context/DonationsContext';

const useGetDonations = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const {setDonations} = useDonationContext();
  const fetchData = async () => {
    await API()
      .get<IDonationsResponse[]>(APP_URLS.GET_DONATIONS)
      .then(res => {
        setIsError(false);
        setDonations(res.data);
      })
      .catch(err => {
        setIsError(true);
        setDonations(undefined);
        showAlertDialog('Some error occurred, Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  return {isError, isLoading, fetchData};
};

export default useGetDonations;
