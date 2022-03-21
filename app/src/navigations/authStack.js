import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Certification from '../screens/Auth/Certification';
import Find from '../screens/Auth/Find';
import TabNavigation from './Tab';
import Header from '../components/common/Header';

const Stack = createStackNavigator();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '로그인',
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: '회원가입',
        }}
      />
      <Stack.Screen
        name="Certification"
        component={Certification}
        options={{
          title: '본인인증',
        }}
      />
      <Stack.Screen
        name="Find"
        component={Find}
        options={{
          title: '찾기',
        }}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
