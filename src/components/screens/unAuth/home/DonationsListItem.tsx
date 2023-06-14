import {IDonationsResponse} from '@models/APIModels';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface DonationsListItemProps {
  item: IDonationsResponse;
  index: number;
  onPress?: (index: number) => void;
}

const RenderDetailItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <HStack flex={1} justifyContent={'space-between'} alignItems={'center'}>
      <Text fontSize={'md'} numberOfLines={1} color="coolGray.600">
        {title}
      </Text>
      <Text
        flex={1}
        textAlign={'right'}
        fontSize={'md'}
        numberOfLines={1}
        bold
        ellipsizeMode={'tail'}>
        {description}
      </Text>
    </HStack>
  );
};
const DonationsListItemComp: React.FC<DonationsListItemProps> = ({
  item,
  index,
  onPress,
}) => {
  const {name, id, price, status, location, theme} = item;
  return (
    <Pressable
      onPress={() => onPress && onPress(index)}
      rounded="8"
      overflow="hidden"
      shadow="3"
      bg="coolGray.200"
      marginY="1"
      marginX="2">
      <Box borderBottomWidth="0" pl={['2', '4']} pr="5" py="2">
        <VStack p={2}>
          <Text fontSize={'lg'} color="primary.600">
            {name ?? ''}
          </Text>
          <Text>{id}</Text>
          <VStack mt={2}>
            {price ? (
              <RenderDetailItem title="Price" description={price.text} />
            ) : null}
            {status ? (
              <RenderDetailItem title="Status" description={status.name} />
            ) : null}
            {location ? (
              <RenderDetailItem title="Location" description={location.name} />
            ) : null}
            {theme ? (
              <RenderDetailItem title="Theme" description={theme.name} />
            ) : null}
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export const DonationsListItem = memo(DonationsListItemComp, isEqual);
