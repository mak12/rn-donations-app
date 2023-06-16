import {useState} from 'react';
import {API} from '@lib/API';
import {IAddDonationRequest, IDonationsResponse} from '@models/APIModels';
import {APP_URLS} from '@utilities/constants';
import {showAlertDialog} from '@utilities/utils';

const useAddDonation = () => {
  const [data, setData] = useState<IDonationsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async (reqData: IAddDonationRequest) => {
    setIsLoading(true);

    await API()
      .post<IDonationsResponse>(APP_URLS.ADD_DONATION, reqData)
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

export default useAddDonation;
