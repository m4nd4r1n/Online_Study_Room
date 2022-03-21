import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigation } from './navigations/authStack';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
