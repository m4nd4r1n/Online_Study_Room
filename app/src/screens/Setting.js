import React, { useMemo } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { logout } from '../modules/user';
import { useDispatch } from 'react-redux';
import { signout } from '../libs/api/auth';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';

const Setting = ({ navigation: { replace } }) => {
  const route = useRoute();
  const dispatch = useDispatch();

  // onPress 추가 가능
  const list = useMemo(() => [
    {
      title: '이용약관',
    },
    {
      title: '개인정보 처리방침',
    },
    {
      title: '프로그램 버전',
      version: '1.0',
    },
    {
      title: '로그아웃',
      onPress: () => {
        Alert.alert('로그아웃', '접속중인 기기에서 로그아웃 하시겠습니까?', [
          {
            text: '예',
            style: 'destructive',
            onPress: () => dispatch(logout()),
          },
          { text: '아니오' },
        ]);
      },
    },
    {
      title: '회원탈퇴',
      onPress: () => {
        Alert.alert('회원탈퇴', `탈퇴하시겠습니까?`, [
          {
            text: '예',
            style: 'destructive',
            onPress: async () => {
              try {
                await signout();
                Alert.alert('회원탈퇴', '회원탈퇴가 완료되었습니다.', [
                  { text: '확인' },
                ]);
                dispatch(logout());
              } catch (e) {
                console.log(e);
                Alert.alert(
                  '회원탈퇴',
                  '회원탈퇴에 실패했습니다.\r다시 시도해주세요.',
                  [{ text: '확인' }],
                );
              }
            },
          },
          { text: '아니오' },
        ]);
      },
    },
  ]);

  return (
    <View style={tw`flex-1 bg-white items-center justify-start`}>
      {list?.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={tw`w-full flex flex-row justify-center items-center px-6 rounded-none border-b border-t border-gray-200`}
          onPress={item?.onPress}
        >
          <View
            style={tw`w-full h-15 flex-1 justify-center items-start `}
            labelStyle={tw`text-black`}
            mode="text"
          >
            <Text style={tw`w-full items-center justify-center`}>
              {item?.title}
            </Text>
          </View>
          {item?.version ? (
            <Text>{item?.version}</Text>
          ) : (
            <AntDesign name="right" size={14} color="black" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Setting;
