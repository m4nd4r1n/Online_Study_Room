import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import { ContentsBlock } from '../../components/common/Contents';
import ChildrenList from '../../components/home/ChildrenList';
import UserInfo from '../../components/home/UserInfo';
import MenteeList from '../../components/home/MenteeList';
import Character from '../../components/home/Character';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../modules/userInfo';
import tw from 'twrnc';

const Home = ({ navigation: { navigate, replace } }) => {
  const dispatch = useDispatch();
  let { info, user } = useSelector(({ userInfo, user }) => ({
    info: userInfo.info,
    user: user.user,
  }));

  useEffect(() => {
    if (user) dispatch(getUserInfo());
    else replace('Login');
  }, [user, dispatch, getUserInfo, replace]);

  return (
    <ContentsBlock center={false}>
      {/* <Button onPress={() => navigate('ObjectDetectTest')}>
        cocossd 객체감지 테스트(에뮬레이터 미지원)
      </Button>
      <Button onPress={() => navigate('ObjectClassifyTest')}>
        mobilenet 객체분류 테스트(에뮬레이터 미지원)
      </Button> */}
      <UserInfo user={user} info={info} />
      {!info ? (
        <Text>사용자 정보를 불러오지 못했습니다.</Text>
      ) : user?.role === '학부모' ? (
        <ChildrenList children={info?.menteeList} />
      ) : user?.role === '멘티' ? (
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
      ) : (
        <MenteeList mentees={info?.menteeList} />
      )}
    </ContentsBlock>
  );
};

export default Home;
