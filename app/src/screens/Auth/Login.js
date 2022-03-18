import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import tw from 'twrnc';
import { useIsFocused } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });
  const onValid = (validForm) => {
    // 백엔드로 전송
    console.log(validForm);
  };
  const [secure, setSecure] = useState(true);
  const inputRef = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) reset();
  }, [isFocused]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`bg-gray-200 items-center flex-1 justify-center`}>
        <View
          style={tw.style('p-8 shadow-md rounded-sm bg-white', {
            width: (SCREEN_WIDTH / 20) * 19,
          })}
        >
          <Text style={tw`mb-3`}>로그인</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 5,
              maxLength: 30,
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
              />
            )}
            name="email"
          />
          <Text
            style={tw.style('text-red-500 mt-2', !errors.email && 'hidden')}
          >
            E-mail이 유효하지 않습니다.
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
              maxLength: 16,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="비밀번호"
                placeholder="최소 8자리"
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
              />
            )}
            name="password"
          />
          <Text
            style={tw.style('text-red-500 mt-2', !errors.password && 'hidden')}
          >
            비밀번호가 유효하지 않습니다.
          </Text>
          <Button
            mode="contained"
            onPress={handleSubmit(onValid)}
            style={tw`bg-cyan-500 mt-3 h-10 justify-center`}
            labelStyle={tw`text-base font-bold`}
          >
            로그인
          </Button>
          <View style={tw`ml-auto mt-8 flex-row items-center text-right`}>
            <TouchableOpacity style={tw`mr-4`}>
              <Text style={tw`text-gray-400 underline`}>E-mail 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`mr-4`}>
              <Text style={tw`text-gray-400 underline`}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={tw`text-gray-400 underline`}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
