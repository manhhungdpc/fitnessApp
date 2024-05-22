import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import AppNavigator from '@src/app/navigator/AppNavigation';
import store from '@src/app/redux/store';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import {getNetworkStatus} from '@src/app/redux/appSlice';

function App(): React.JSX.Element {
  useEffect(() => {
    if (LottieSplashScreen) {
      LottieSplashScreen.hide();
    }
    getNetworkStatus();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
