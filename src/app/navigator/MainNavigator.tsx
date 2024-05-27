import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Typography from '@src/resources/Typography';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ScreenNames from './ScreenNames';
import {isIOS} from '@src/base/common';
import {useAccessToken, useAppDispatch, useAppLanguage} from '../redux/appSlice';
import {Icon, MD2Colors, Text} from 'react-native-paper';
import {getUserProfile} from '@src/features/auth/action/authSlice';
import QrScreen from '@src/features/qr/screen/QrScreen';
import HomeNavigation from './HomeNavigation';
import ScheduleNavigation from './SchuduleNavigation';
import ProfileNavigation from './ProfileNavigation';

export type MainParamList = {
  [ScreenNames.HOME_NAVIGATOR]: undefined;
  [ScreenNames.OTHER_NAVIGATOR]: undefined;
  [ScreenNames.QR_SCREEN]: undefined;
  [ScreenNames.SCHEDULE_NAVIGATOR]: undefined;
  [ScreenNames.PROFILE_NAVIGATOR]: undefined;
  [ScreenNames.NEW_DETAILS]: undefined;
};

const Tab = createBottomTabNavigator<MainParamList>();

const MainNavigator = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const accessToken = useAccessToken();
  useEffect(() => {
    if (accessToken) {
      dispatch(getUserProfile());
    }
  }, [accessToken, dispatch]);

  const createHeader = () => <View style={styles.tabBarHeader} />;
  const language = useAppLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: Typography.text12Regular,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: {marginTop: isIOS() ? 0 : 12},
        tabBarBackground: BottomBarBackground,
      }}>
      <Tab.Screen
        name={ScreenNames.HOME_NAVIGATOR}
        component={HomeNavigation}
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, 'home'),
          tabBarLabel: ({focused}) =>
            createLabel(language.bottomTabs.home, focused),
          header: () => createHeader(),
        }}
      />
      <Tab.Screen
        name={ScreenNames.QR_SCREEN}
        component={QrScreen}
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, 'qrcode-scan'),
          tabBarLabel: ({focused}) =>
            createLabel(language.bottomTabs.qr, focused),
          header: () => createHeader(),
        }}
      />
      <Tab.Screen
        name={ScreenNames.SCHEDULE_NAVIGATOR}
        component={ScheduleNavigation}
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, 'calendar-clock'),
          tabBarLabel: ({focused}) =>
            createLabel(language.bottomTabs.schedule, focused),
          header: () => createHeader(),
        }}
      />
      <Tab.Screen
        name={ScreenNames.PROFILE_NAVIGATOR}
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, 'account-circle'),
          tabBarLabel: ({focused}) =>
            createLabel(language.bottomTabs.profile, focused),
          header: () => createHeader(),
        }}
      />
    </Tab.Navigator>
  );
};

const createLabel = (label: string, focused: boolean) => (
  <TabLabel label={label} focused={focused} />
);

const TabLabel = ({label, focused}: {label: string; focused: boolean}) => {
  return (
    <Text
      style={[
        Typography.l2SemiBold,
        {color: focused ? Colors.primary100 : Colors.natural80},
      ]}>
      {label}
    </Text>
  );
};

const TabBarIcon = (focused: boolean, iconName: string) => {
  return <Icon source={iconName} size={18} color={focused ? 'red' : 'black'} />;
};

export const BottomBarBackground = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{height: 72 + insets.bottom}}>
      <View style={styles.tabBarBackgroundBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarBackgroundBottom: {
    backgroundColor: Colors.natural10,
    flex: 1,
    alignItems: 'center',
  },
  tabBarBackgroundImage: {height: isIOS() ? 56 : 64, width: '100%'},
  tabBarItem: {},
  tabBarHeader: {
    height: 70,
    backgroundColor: MD2Colors.blueGrey700,
  },
});

export default MainNavigator;
