import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import AppNavigator from './src/navigation/index';
import I18n from './src/utilities/i18n/i18n';
import {extendTheme, NativeBaseProvider} from 'native-base';

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme});

const App = () => {
  return (
    <I18nextProvider i18n={I18n}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <NativeBaseProvider theme={theme}>
        <AppNavigator />
      </NativeBaseProvider>
    </I18nextProvider>
  );
};

export default App;
