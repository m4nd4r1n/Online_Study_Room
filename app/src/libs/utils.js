import tw from 'twrnc';
import { setCookie } from './api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeStyle = tw`flex-1 bg-white items-center justify-center`;

export const isEmail = (value) => {
  const regex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!(value !== undefined && regex.test(value))) {
    return '이메일 형식이 아닙니다.';
  }
};

export const handleCookie = async (key, cookie) => {
  try {
    setCookie(cookie);
    await storeData(key, cookie);
  } catch (e) {
    console.error(e);
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
