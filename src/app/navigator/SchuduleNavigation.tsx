import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ScreenNames from './ScreenNames';
import {RootStackParamList} from './RootParam';
import ScheduleScreen from '@src/features/schedule/screens/ScheduleScreens';
import ServiceScreen from '@src/features/schedule/screens/ServiceScreens';

const ScheduleNavigation = () => {
  const stack = createStackNavigator<RootStackParamList>();
  return (
    <stack.Navigator screenOptions={{}}>
      <stack.Screen
        name={ScreenNames.SERVICE_SCREEN}
        component={ServiceScreen}
        options={{
          headerTintColor: 'black',
          headerShown: false,
        }}
      />
      <stack.Screen
        name={ScreenNames.SCHEDULE_SCREEN}
        component={ScheduleScreen}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default ScheduleNavigation;
