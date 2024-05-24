/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from './ScreenNames';
import UsernameLoginScreen from '@src/features/auth/screen/Username';
import {useAppLanguage} from '../redux/appSlice';
import {RootStackParamList} from './RootParam';
import PasswordLoginScreen from '@src/features/auth/screen/Password';
import ChangePasswordScreen from '@src/features/auth/screen/ChangePassword';

const AuthNavigator = () => {
  const stack = createStackNavigator<RootStackParamList>();
  const language = useAppLanguage();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen
        name={ScreenNames.LOGIN_USERNAME_SCREEN}
        component={UsernameLoginScreen}
        options={{
          headerTitle: language.auth.username_title,
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
          headerShown: false,
        }}
      />
      <stack.Screen
        name={ScreenNames.LOGIN_PASSWORD_SCREEN}
        component={PasswordLoginScreen}
        options={{
          headerTitle: language.auth.password_title,
          headerTintColor: 'black',
          headerShown: false,
        }}
      />
      <stack.Screen
        name={ScreenNames.CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
        options={{
          headerTitle: language.auth.password_title,
          headerTintColor: 'black',
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default AuthNavigator;
