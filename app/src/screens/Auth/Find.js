import React, { useState, useRef, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import tw from 'twrnc';
import AuthLayout from '../../components/auth/AuthLayout';
import { isEmail } from '../../libs/utils';
import { Error } from '../../components/auth/common';

const Find = ({ route, navigation: { navigate } }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '' }, mode: 'onChange' });
  const certSuccess = route?.params?.success;
  const impUID = route?.params?.imp_uid;
  const onValid = (validForm) => {
    // 백엔드로 전송
    const data = { ...validForm, impUID };
    console.log(data);
  };
  return (
    <AuthLayout>
      <Text style={tw`mb-3`}>{route.params.type} 찾기</Text>
      {route.params.type === '비밀번호' && (
        <View>
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
        </View>
      )}
      <Button
        mode="contained"
        onPress={() => navigate('Certification', { authType: 'find' })}
        style={tw.style(
          ' mt-3 justify-center',
          certSuccess ? 'bg-gray-400' : 'bg-cyan-500',
        )}
        labelStyle={tw`text-base font-bold`}
        disabled={certSuccess}
      >
        {certSuccess ? '인증완료' : '본인인증'}
      </Button>
      <Button
        mode="contained"
        onPress={handleSubmit(onValid)}
        style={tw.style(
          ' mt-3 justify-center mb-1',
          !certSuccess ? 'bg-gray-300' : 'bg-cyan-500',
        )}
        disabled={!certSuccess}
        labelStyle={tw`text-base font-bold`}
      >
        {route.params.type} 찾기
      </Button>
    </AuthLayout>
  );
};

export default Find;
