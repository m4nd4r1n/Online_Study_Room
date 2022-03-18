import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigation, AuthStackNavigation } from './Stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="home" {...props} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="AuthTab"
        component={AuthStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="login" {...props} />
          ),
          tabBarLabel: 'Login',
          tabBarHideOnKeyboard: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
