import React from 'react';
import {AppStackNavigation, navigationRef} from './navigation';
import {NavigationContainer} from '@react-navigation/native';
import './i18';
import store from './redux/store';
import {Provider} from 'react-redux';
import {Text} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
        fallback={<Text>Loading...</Text>}
        ref={navigationRef}>
        <NativeBaseProvider>
          <AppStackNavigation />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
