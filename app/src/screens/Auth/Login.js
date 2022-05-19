import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import tw from 'twrnc';
import { useIsFocused } from '@react-navigation/native';
import AuthLayout from '../../components/auth/AuthLayout';
import { handleCookie, isEmail, storeData } from '../../libs/utils';
import { Error } from '../../components/auth/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../libs/api/auth';
import { check } from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';

const Login = ({ navigation: { navigate, replace } }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' }, mode: 'onChange' });
  const onValid = async (validForm) => {
    console.log(validForm);

    // 로그인
    try {
      const payload = await login(validForm);
      const [cookie] = payload.headers['set-cookie'];

      // 응답에 쿠키 존재 시
      if (cookie) {
        await handleCookie('cookie', JSON.stringify(cookie));
        dispatch(check());
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [secure, setSecure] = useState(true);
  const inputRef = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) reset();
  }, [isFocused]);
  const move = async (user) => {
    try {
      await AsyncStorage.setItem('@user', user);
    } catch (e) {
      console.log(e);
    }
    replace('Tab');
  };

  useEffect(() => {
    if (user) {
      try {
        storeData('@user', JSON.stringify(user));
        replace('Tab');
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [user]);

  return (
    <AuthLayout>
      <Text style={tw`mb-3`}>로그인</Text>
      <View style={tw`flex-row justify-center`}>
        <Button onPress={() => move('멘토')}>멘토 이동</Button>
        <Button onPress={() => move('멘티')}>멘티 이동</Button>
        <Button onPress={() => move('학부모')}>학부모 이동</Button>
      </View>

      <Controller
        control={control}
        rules={{
          required: '이메일을 입력하세요',
          minLength: {
            message: '입력 길이가 짧습니다.',
            value: 5,
          },
          maxLength: {
            message: '최대 입력 길이를 초과하였습니다.',
            value: 30,
          },
          validate: {
            isEmail,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="E-mail"
            placeholder="ex) example@example.com"
            mode="outlined"
            style={tw`bg-white`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email}
            returnKeyType="next"
            onSubmitEditing={() => {
              inputRef.current.focus();
            }}
            activeOutlineColor="#06B6D4"
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && <Error>{errors.email?.message}</Error>}
      <Controller
        control={control}
        rules={{
          required: '비밀번호를 입력하세요',
          minLength: {
            message: '비밀번호는 최소 8자리입니다.',
            value: 8,
          },
          maxLength: {
            message: '비밀번호는 최대 20자리입니다.',
            value: 20,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="비밀번호"
            placeholder="8 ~ 20자리"
            mode="outlined"
            style={tw`bg-white mt-2`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password}
            secureTextEntry={secure}
            returnKeyType="done"
            right={
              <TextInput.Icon
                name={secure ? 'eye-off' : 'eye'}
                onPress={() => setSecure(!secure)}
              />
            }
            activeOutlineColor="#06B6D4"
            ref={inputRef}
            keyboardType={'visible-password'}
          />
        )}
        name="password"
      />
      {errors.password && <Error>{errors.password?.message}</Error>}
      <Button
        mode="contained"
        onPress={handleSubmit(onValid)}
        style={tw`bg-cyan-500 mt-3 justify-center`}
        labelStyle={tw`text-base font-bold`}
      >
        로그인
      </Button>
      <View style={tw`ml-auto mt-8 flex-row items-center text-right`}>
        <TouchableOpacity
          onPress={() => navigate('Find', { type: 'E-mail' })}
          style={tw`mr-4`}
        >
          <Text style={tw`text-gray-400 underline`}>E-mail 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Find', { type: '비밀번호' })}
          style={tw`mr-4`}
        >
          <Text style={tw`text-gray-400 underline`}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Register')}>
          <Text style={tw`text-gray-400 underline`}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default Login;
