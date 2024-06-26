/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AuthNavigator from './AuthNavigation';
import {
  getNetworkStatus,
  getToken,
  setError,
  useAccessToken,
  useAppDispatch,
  useAppError,
  useAppLanguage,
  useAppLoadingStatus,
  useNetworkStatus,
} from '../redux/appSlice';
import NetworkError from '@src/features/utils/NetworkErrors';
import {Snackbar} from 'react-native-paper';
import MainNavigator from './MainNavigator';
import { DefaultLoading } from '@src/features/utils/Loading';

const Stack = createStackNavigator();

const AppSnackBar = () => {
  const error = useAppError();
  const dispatch = useAppDispatch();
  const language = useAppLanguage();
  return (
    <Snackbar
      visible={error !== null}
      onDismiss={() => dispatch(setError(null))}
      action={{
        label: 'Opp! Error',
        onPress: () => {},
      }}>
      {error}
    </Snackbar>
  );
};

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const accessToken = useAccessToken();
  const onLoading = useAppLoadingStatus();
  useEffect(() => {
    dispatch(getNetworkStatus());
    dispatch(getToken());
  }, [dispatch]);

  if (onLoading) {
    return <DefaultLoading />;
  }

  if (!useNetworkStatus) {
    return <NetworkError />;
  }

  return (
    <NavigationContainer fallback={<></>}>
      {accessToken ? <MainNavigator /> : <AuthNavigator />}
      <AppSnackBar />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;
