import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContentsBlock } from '../../components/common/Contents';
import ChildrenList from '../../components/home/ChildrenList';
import UserInfo from '../../components/home/UserInfo';
import MenteeList from '../../components/home/MenteeList';
import Character from '../../components/home/Character';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';

const Home = ({ navigation: { navigate } }) => {
  const [user, setUser] = useState('');
  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem('@user');
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };
  getUser();
  return (
    <ContentsBlock center={false}>
      {/* <Button onPress={() => navigate('ObjectDetectTest')}>
        cocossd 객체감지 테스트(에뮬레이터 미지원)
      </Button>
      <Button onPress={() => navigate('ObjectClassifyTest')}>
        mobilenet 객체분류 테스트(에뮬레이터 미지원)
      </Button> */}
      <UserInfo user={user} />
      {user === '학부모' ? (
        <ChildrenList />
      ) : user === '멘티' ? (
        <>
          <Character />
          <Button
            style={tw`bg-gray-600 w-full`}
            contentStyle={tw`py-1`}
            labelStyle={tw`text-sm`}
            mode="contained"
            onPress={() => {}}
            icon={() => (
              <MaterialCommunityIcons
                name="play-circle-outline"
                size={24}
                color="white"
              />
            )}
          >
            학습시작
          </Button>
        </>
      ) : user === '멘토' ? (
        <MenteeList />
      ) : (
        <Text>사용자 정보를 불러오지 못했습니다.</Text>
      )}
    </ContentsBlock>
  );
};

export default Home;
