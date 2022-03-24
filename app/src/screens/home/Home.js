import React from 'react';
import { Text, View } from 'react-native';
import { HomeStyle } from '../../libs/utils';
import { Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const Home = ({ navigation: { replace, navigate } }) => {
  const route = useRoute();
  return (
    <View style={HomeStyle}>
      <Text>{route.name}</Text>
      <Button onPress={() => replace('Login')}>로그인 화면 이동</Button>
      <Button onPress={() => navigate('ObjectDetectTest')}>
        cocossd 객체감지 테스트(에뮬레이터 미지원)
      </Button>
      <Button onPress={() => navigate('ObjectClassifyTest')}>
        mobilenet 객체분류 테스트(에뮬레이터 미지원)
      </Button>
    </View>
  );
};

export default Home;
