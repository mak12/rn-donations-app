import {
  HStack,
  ITextAreaProps,
  Text,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface AuthTextAreaProps extends ITextAreaProps {
  error: string | undefined;
  heading: string | undefined;
  containerProps?: InterfaceVStackProps;
}

const AuthTextAreaComp: React.FC<AuthTextAreaProps> = props => {
  const {error, heading, containerProps, ...rest} = props;
  return (
    <VStack {...containerProps}>
      {heading ? <Text fontSize={'md'}>{heading}</Text> : null}
      <TextArea
        autoCompleteType={false}
        mt={'1'}
        {...rest}
        borderColor={error ? 'red.500' : null}
      />
      {error ? (
        <HStack alignItems={'center'}>
          <WarningOutlineIcon color={'red.400'} size="xs" />
          <Text ml={'1'} mb={'0'} fontSize="sm" color={'red.400'}>
            {error}
          </Text>
        </HStack>
      ) : null}
    </VStack>
  );
};

export const AuthTextArea = memo(AuthTextAreaComp, isEqual);
