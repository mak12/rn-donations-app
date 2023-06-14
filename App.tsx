import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import AppNavigator from './src/navigation/index';
import I18n from './src/utilities/i18n/i18n';

const App = () => {
  return (
    <I18nextProvider i18n={I18n}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <AppNavigator />
    </I18nextProvider>
  );
};

export default App;
