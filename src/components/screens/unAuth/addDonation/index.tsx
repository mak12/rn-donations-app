import React, {memo, useEffect, useMemo, useState} from 'react';
import {APP_SCREEN, HomeStackParamList} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import {Image, Pressable, Select, useToast, VStack} from 'native-base';
import {AppHeading} from '@common/appHeading';
import {getExceptionPayload, showAlertDialog} from '@utilities/utils';
import {Formik} from 'formik';
import {AuthInput} from '@common/authInput';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {AppButton} from '@common/appButton';
import {Loader} from '@common/loader';
import {images} from '@assets/images';

import * as Yup from 'yup';
import useGetDonationThemes from '@hooks/use-get-donation-themes';
import useGetDonationLocations from '@hooks/use-get-donation-locations';
import {AppSelect} from '@common/appSelect';
import useAddDonation from '@hooks/use-add-donation';
import {IAddDonationRequest} from '@models/APIModels';

type AddDonationScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  APP_SCREEN.ADD_DONATION
>;
type AddDonationScreenNavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  APP_SCREEN.ADD_DONATION
>;
interface IAddDonationFormValues {
  name: string;
  locationId: string;
  themeId: string;
  amount: string;
  currencyCode: string;
}
const initialValues: IAddDonationFormValues = {
  name: '',
  locationId: '',
  themeId: '',
  amount: '',
  currencyCode: 'GBP',
};

const AddDonationScreenComp: React.FC<AddDonationScreenProps> = ({route}) => {
  const navigation = useNavigation<AddDonationScreenNavigationProps>();
  const {t} = useTranslation();
  const toast = useToast();

  const {data: donationThemes} = useGetDonationThemes();
  const {data: donationLocations} = useGetDonationLocations();
  const {
    data: addDonationData,
    isLoading,
    isError,
    fetchData,
  } = useAddDonation(); //lazy hook

  const formValidation = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required('Enter name'),
        locationId: Yup.string().required('Select location'),
        themeId: Yup.string().required('Select theme'),
        amount: Yup.string().optional(),
      }),
    [],
  );

  const DonationThemeOptions = useMemo(() => {
    return donationThemes
      ? donationThemes.map((item, index) => {
          return (
            <Select.Item
              key={`${index}`}
              label={`${item.name}`}
              value={`${item.id}`}
            />
          );
        })
      : null;
  }, [donationThemes]);

  const DonationLocationOptions = useMemo(() => {
    return donationLocations
      ? donationLocations.map((item, index) => {
          return (
            <Select.Item
              key={`${index}`}
              label={`${item.name}`}
              value={`${item.id}`}
            />
          );
        })
      : null;
  }, [donationLocations]);

  useEffect(() => {
    if (isError) {
      showAlertDialog('Sommer Error Occured');
      return;
    }
    if (addDonationData) {
      toast.show({
        description: 'Successfully added',
        duration: 2000,
      });
      navigation.goBack();
      return;
    }
  }, [addDonationData, isError]);
  return (
    <VStack backgroundColor={'white'} flex={1} safeArea>
      <VStack flex={1} marginX={'4'}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            p={'2'}
            my={'5'}
            alt={`backArrow`}
            source={images.icLeftArrow}
          />
        </Pressable>
        <AppHeading mb={'1'}>{t('addDonationScreen:title')}</AppHeading>
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnMount={false}
          validationSchema={formValidation}
          onSubmit={(values, {resetForm}) => {
            let reqData: IAddDonationRequest = {
              name: values.name,
              location: values.locationId,
              theme: values.themeId,
              price: {
                amount: Number(values.amount),
                currencyCode: values.currencyCode,
              },
            };
            fetchData(reqData);
          }}>
          {({errors, handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <AuthInput
                heading={t('addDonationScreen:nameInputHeading')}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                fontSize="md"
                type="text"
                containerProps={{
                  mt: 3,
                }}
                numberOfLines={1}
                error={errors.name}
              />
              <AppSelect
                containerProps={{
                  mt: '2',
                }}
                headingTextProps={{
                  fontSize: 'sm',
                }}
                heading={t('addDonationScreen:locationDropdownTitle')}
                onValueChange={handleChange('locationId')}
                placeholder={t('addDonationScreen:locationDropdownPlaceHolder')}
                error={errors.locationId}>
                {DonationLocationOptions}
              </AppSelect>

              <AppSelect
                containerProps={{
                  mt: '2',
                }}
                headingTextProps={{
                  fontSize: 'sm',
                }}
                heading={t('addDonationScreen:themeDropdownTitle')}
                onValueChange={handleChange('themeId')}
                placeholder={t('addDonationScreen:themeDropdownPlaceHolder')}
                error={errors.themeId}>
                {DonationThemeOptions}
              </AppSelect>

              <AuthInput
                heading={t('addDonationScreen:amountInputHeading')}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
                fontSize="md"
                returnKeyType="done"
                keyboardType="number-pad"
                type="text"
                containerProps={{
                  mt: 3,
                }}
                numberOfLines={1}
                error={errors.amount}
              />
              <AppButton mt={5} onPress={handleSubmit}>
                {t('addDonationScreen:addDonationButton')}
              </AppButton>
            </>
          )}
        </Formik>
      </VStack>
      <Loader isLoading={isLoading} />
    </VStack>
  );
};

export const AddDonationScreen = memo(AddDonationScreenComp, isEqual);
