/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AuthNavigator from './AuthNavigation';
import {
  getNetworkStatus,
  useAppDispatch,
  useNetworkStatus,
} from '../redux/appSlice';
import NetworkError from '@src/features/utils/NetworkErrors';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log(1);
    dispatch(getNetworkStatus());
  }, [dispatch]);

  if (!useNetworkStatus) {
    return <NetworkError />;
  }

  return (
    <NavigationContainer fallback={<></>}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;
