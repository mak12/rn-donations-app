import React, {memo, useEffect, useMemo, useState} from 'react';
import {ViewStyle, StyleSheet} from 'react-native';
import {APP_SCREEN, HomeStackParamList} from '@utilities/types';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import isEqual from 'react-fast-compare';
import useGetDonations from '@hooks/use-get-donations';
import {Fab, Select, VStack, Text, Center, FlatList} from 'native-base';
import {Loader} from '@common/loader';
import {IDonationsResponse} from '@models/APIModels';
import {DonationsListItem} from './DonationsListItem';
import {AppSelect} from '@common/appSelect';
import {useTranslation} from 'react-i18next';
import useGetDonationStatuses from '@hooks/use-get-donation-statuses';
import {useDonationContext} from 'src/context/DonationsContext';

interface IStyles {
  listContainerStyle: ViewStyle;
}
type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  APP_SCREEN.HOME
>;
type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  APP_SCREEN.HOME
>;

const RenderEmptyComponent = () => {
  return (
    <Center flex={1}>
      <Text fontSize={'lg'}>No Data Found</Text>
    </Center>
  );
};

const HomeScreenComp: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const {isLoading, fetchData} = useGetDonations();
  const {data: statuses} = useGetDonationStatuses();
  const {donations} = useDonationContext();

  const [fileredDonations, setFileredDonations] = useState<
    IDonationsResponse[]
  >([]);

  useEffect(() => {
    if (donations) setFileredDonations(donations);
  }, [donations]);

  useEffect(() => {
    fetchData();
  }, [isFocused]);
  const StatusesOptions = useMemo(() => {
    return statuses
      ? statuses.map((item, index) => {
          return (
            <Select.Item
              key={`${index}`}
              label={`${item.name}`}
              value={`${item.id}`}
            />
          );
        })
      : null;
  }, [statuses]);

  const handleStatusesValueChanged = (statusId: string) => {
    const filteredData =
      donations?.filter(item => item.status.id === statusId) ?? [];
    setFileredDonations(filteredData);
  };

  const onAddDonation = () => {
    navigation.navigate(APP_SCREEN.ADD_DONATION);
  };

  return (
    <VStack flex={1} safeArea>
      <AppSelect
        containerProps={{
          mt: '2',
          px: '2',
        }}
        headingTextProps={{
          fontSize: 'sm',
        }}
        heading={t('homeScreen:statusDropdownTitle')}
        onValueChange={handleStatusesValueChanged}
        placeholder={t('homeScreen:statusDropdownPlaceHolder')}>
        {StatusesOptions}
      </AppSelect>
      <FlatList
        data={fileredDonations ?? []}
        contentContainerStyle={styles.listContainerStyle}
        ListEmptyComponent={RenderEmptyComponent}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({
          item,
          index,
        }: {
          item: IDonationsResponse;
          index: number;
        }) => (
          <DonationsListItem
            index={index}
            item={item}
            key={`donationListItem${item.id}`}
          />
        )}
      />
      <Fab
        renderInPortal={false}
        label="Add Donation"
        shadow={2}
        placement="bottom-right"
        mb={'5'}
        onPress={onAddDonation}
      />
      <Loader isLoading={isLoading} />
    </VStack>
  );
};
const styles = StyleSheet.create<IStyles>({
  listContainerStyle: {flexGrow: 1},
});
export const HomeScreen = memo(HomeScreenComp, isEqual);
