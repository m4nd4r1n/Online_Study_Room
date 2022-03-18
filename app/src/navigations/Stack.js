import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

const Stack = createNativeStackNavigator();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitleAlign: 'center',
          title: '로그인',
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerBackVisible: true,
          headerTitleAlign: 'center',
          title: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
};

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
