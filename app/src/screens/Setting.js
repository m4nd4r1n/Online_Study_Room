import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { HomeStyle } from '../libs/utils';
import { Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const Setting = ({ navigation: { replace } }) => {
  const route = useRoute();
  return (
    <View style={HomeStyle}>
      <StatusBar style="auto" />
      <Text>{route.name}</Text>
      <Button onPress={() => replace('Login')}>로그인 화면 이동</Button>
    </View>
  );
};

export default Setting;
