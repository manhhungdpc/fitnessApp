/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from './ScreenNames';
import UsernameLoginScreen from '@src/features/auth/screen/Username';

const AuthNavigator = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen
        name={ScreenNames.LOGIN_USERNAME_SCREEN}
        component={UsernameLoginScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#ffffff',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 0,
          },
          headerTintColor: 'black',
          headerShown: true,
        }}
      />
    </stack.Navigator>
  );
};

export default AuthNavigator;
