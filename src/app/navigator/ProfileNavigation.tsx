import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ScreenNames from './ScreenNames';
import {RootStackParamList} from './RootParam';
import ProfileScreen from '@src/features/profile/screens/ProfileScreen';

const ProfileNavigation = () => {
  const stack = createStackNavigator<RootStackParamList>();
  return (
    <stack.Navigator screenOptions={{}}>
      <stack.Screen
        name={ScreenNames.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerTintColor: 'black',
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default ProfileNavigation;
