import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from 'react-native-paper';
import Typography from '@src/resources/Typography';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Strings from '@src/resources/localization/Strings';
import ScreenNames from './ScreenNames';
import {isIOS} from '@src/base/common';
import NewsScreen from '@src/features/home/screen/News';

export type MainParamList = {
  [ScreenNames.HOME_NAVIGATOR]: undefined;
  [ScreenNames.OTHER_NAVIGATOR]: undefined;
};

const Tab = createBottomTabNavigator<MainParamList>();

const MainNavigator = (): JSX.Element => {
  const createLabel = (label: string, focused: boolean) => (
    <TabLabel label={label} focused={focused} />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: Typography.text12Regular,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: {marginTop: isIOS() ? 0 : 12},
        headerShown: false,
        tabBarBackground: BottomBarBackground,
      }}>
      <Tab.Screen
        name={ScreenNames.HOME_NAVIGATOR}
        component={NewsScreen}
        // options={{
        //   tabBarIcon: ({focused}) =>
        //     focused ? (
        //       <Icon source="location-exit" size={12} color="red" />
        //     ) : (
        //       <Icon source="location-enter" size={12} color="black" />
        //     ),
        //   tabBarLabel: ({focused}) =>
        //     createLabel(Strings.bottomTabs.home, focused),
        // }}
      />
    </Tab.Navigator>
  );
};

const TabLabel = ({label, focused}: {label: string; focused: boolean}) => {
  console.log(label);
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
});

export default MainNavigator;
