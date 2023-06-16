import {IDonationsResponse} from '@models/APIModels';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';

interface DonationContextProps {
  setDonations: (donations: IDonationsResponse[] | undefined) => void;
  donations: IDonationsResponse[] | undefined;
}

function noop() {
  return;
}

const DonationContext = createContext<DonationContextProps>({
  setDonations: noop,
  donations: undefined,
});

export function DonationContextProvider({children}: React.PropsWithChildren) {
  type State = Omit<DonationContextProps, 'setDonations'>;

  const [state, setState] = useState<State>({
    donations: undefined,
  });

  const handleOnReceiveDonations = (
    donations: IDonationsResponse[] | undefined,
  ) => {
    setState({donations});
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      setDonations: handleOnReceiveDonations,
    }),
    [state],
  );

  return (
    <DonationContext.Provider value={contextValue}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonationContext() {
  return useContext(DonationContext);
}
