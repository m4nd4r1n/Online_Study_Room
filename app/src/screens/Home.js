import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { HomeStyle } from '../components/temp';

const Home = () => {
  return (
    <View style={HomeStyle}>
      <StatusBar style="auto" />
      <Text>Home</Text>
    </View>
  );
};

export default Home;
