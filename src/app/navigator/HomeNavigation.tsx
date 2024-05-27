import {createStackNavigator} from '@react-navigation/stack';
import {useNewDetails} from '@src/features/home/action/homeSlice';
import React from 'react';
import ScreenNames from './ScreenNames';
import NewDetails from '@src/features/home/screen/NewsDetails';
import NewsScreen from '@src/features/home/screen/News';
import {RootStackParamList} from './RootParam';

const HomeNavigation = () => {
  const stack = createStackNavigator<RootStackParamList>();
  const newDetails = useNewDetails();

  return (
    <stack.Navigator screenOptions={{}}>
      <stack.Screen
        name={ScreenNames.HOME_SCREEN}
        component={NewsScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name={ScreenNames.NEW_DETAILS}
        component={NewDetails}
        options={{
          headerTitle: newDetails?.name,
          headerTintColor: 'black',
          headerShown: true,
        }}
      />
    </stack.Navigator>
  );
};

export default HomeNavigation;
