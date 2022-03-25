import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import tw from 'twrnc';
import {
  TextInput,
  Button,
  Checkbox,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';
import AuthLayout from '../../components/auth/AuthLayout';
import { isEmail } from '../../libs/utils';
import { Error } from '../../components/auth/common';

const Register = ({ route, navigation: { navigate } }) => {
  const [state, setState] = useState({
    type: route?.params?.type,
    secure: true,
    checked: false,
    visible: false,
  });
  const inputRef = useRef([]);
  const certSuccess = JSON.parse(route?.params?.success || 'false');
  const impUID = route?.params?.imp_uid;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      school: '',
      stdName: '',
      phoneFirst: '',
      phoneMiddle: '',
      phoneLast: '',
    },
    mode: 'onChange',
  });

  const onValid = (validForm) => {
    // 백엔드로 전송
    delete validForm.passwordConfirm;
    const data = { ...validForm, impUID, type: state.type };
    console.log(data);
  };
  return (
    <Provider>
      <AuthLayout>
        {!state.type && !route.params && (
          <View>
            <Button
              mode="contained"
              onPress={() => setState({ ...state, type: '멘토' })}
              style={tw`bg-cyan-500 justify-center`}
              labelStyle={tw`text-base font-bold`}
            >
              멘토 가입
            </Button>
            <Button
              mode="contained"
              onPress={() => setState({ ...state, type: '멘티' })}
              style={tw`bg-cyan-500 mt-6 justify-center`}
              labelStyle={tw`text-base font-bold`}
            >
              멘티 가입
            </Button>
            <Button
              mode="contained"
              onPress={() => setState({ ...state, type: '학부모' })}
              style={tw`bg-cyan-500 mt-6 justify-center`}
              labelStyle={tw`text-base font-bold`}
            >
              학부모 가입
            </Button>
          </View>
        )}
        {state.type && (
          <View>
            <Text style={tw`mb-3`}>회원가입</Text>
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
                    inputRef.current[0].focus();
                  }}
                  activeOutlineColor="#06B6D4"
                  maxLength={30}
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
                  secureTextEntry={state.secure}
                  returnKeyType="next"
                  right={
                    <TextInput.Icon
                      name={state.secure ? 'eye-off' : 'eye'}
                      onPress={() =>
                        setState({ ...state, secure: !state.secure })
                      }
                    />
                  }
                  onSubmitEditing={() => {
                    inputRef.current[1].focus();
                  }}
                  activeOutlineColor="#06B6D4"
                  ref={(el) => (inputRef.current[0] = el)}
                  maxLength={20}
                />
              )}
              name="password"
            />
            {errors.password && <Error>{errors.password?.message}</Error>}
            <Controller
              control={control}
              rules={{
                required: '비밀번호를 재입력하세요',
                minLength: {
                  message: '비밀번호는 최소 8자리입니다.',
                  value: 8,
                },
                maxLength: {
                  message: '비밀번호는 최대 20자리입니다.',
                  value: 20,
                },
                validate: {
                  matchPreviousPassword: (value) => {
                    const { password } = getValues();
                    return (
                      password === value || '비밀번호가 일치하지 않습니다.'
                    );
                  },
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="비밀번호 확인"
                  placeholder="8 ~ 20자리"
                  mode="outlined"
                  style={tw`bg-white mt-2`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.passwordConfirm}
                  secureTextEntry={state.secure}
                  returnKeyType={state.type === '멘토' ? 'done' : 'next'}
                  right={
                    <TextInput.Icon
                      name={state.secure ? 'eye-off' : 'eye'}
                      onPress={() =>
                        setState({ ...state, secure: !state.secure })
                      }
                    />
                  }
                  onSubmitEditing={() => {
                    if (state.type === '멘티') {
                      inputRef.current[2].focus();
                    } else if (state.type === '학부모') {
                      inputRef.current[3].focus();
                    }
                  }}
                  activeOutlineColor="#06B6D4"
                  ref={(el) => (inputRef.current[1] = el)}
                  maxLength={20}
                />
              )}
              name="passwordConfirm"
            />
            {errors.passwordConfirm && (
              <Error>{errors.passwordConfirm?.message}</Error>
            )}
            {state.type === '멘티' && (
              <>
                <Controller
                  control={control}
                  rules={{
                    required: '학교명을 입력하세요',
                    maxLength: {
                      message: '학교명은 최대 10자입니다.',
                      value: 10,
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="학교"
                      placeholder="ex) 스카이고등학교"
                      mode="outlined"
                      style={tw`bg-white mt-2`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.school}
                      returnKeyType="done"
                      activeOutlineColor="#06B6D4"
                      ref={(el) => (inputRef.current[2] = el)}
                      maxLength={10}
                    />
                  )}
                  name="school"
                />
                {errors.school && <Error>{errors.school?.message}</Error>}
              </>
            )}
            {state.type === '학부모' && (
              <>
                <Controller
                  control={control}
                  rules={{
                    required: '자녀 이름을 입력하세요.',
                    maxLength: {
                      message: '자녀 이름은 최대 10자입니다.',
                      value: 10,
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="자녀 이름"
                      placeholder="ex) 홍길동"
                      mode="outlined"
                      style={tw`bg-white mt-2`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.stdName}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        inputRef.current[4].focus();
                      }}
                      activeOutlineColor="#06B6D4"
                      ref={(el) => (inputRef.current[3] = el)}
                      maxLength={10}
                    />
                  )}
                  name="stdName"
                />
                {errors.stdName && <Error>{errors.stdName?.message}</Error>}
                <View style={tw`flex-row justify-between`}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 3,
                      maxLength: 3,
                      onChange: (e) =>
                        setValue(
                          'phoneFirst',
                          e.target.value.replace(/[^0-9]/g, ''),
                        ),
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label="자녀"
                        placeholder="ex) 010"
                        mode="outlined"
                        style={tw`bg-white mt-2 w-[30%] mr-2`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.phoneFirst}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          inputRef.current[5].focus();
                        }}
                        activeOutlineColor="#06B6D4"
                        ref={(el) => (inputRef.current[4] = el)}
                        maxLength={3}
                        keyboardType="number-pad"
                      />
                    )}
                    name="phoneFirst"
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 3,
                      maxLength: 4,
                      onChange: (e) =>
                        setValue(
                          'phoneMiddle',
                          e.target.value.replace(/[^0-9]/g, ''),
                        ),
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label="전화번호"
                        placeholder="ex) 1234"
                        mode="outlined"
                        style={tw`bg-white mt-2 w-[30%]`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.phoneMiddle}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          inputRef.current[6].focus();
                        }}
                        activeOutlineColor="#06B6D4"
                        ref={(el) => (inputRef.current[5] = el)}
                        maxLength={4}
                        keyboardType="number-pad"
                      />
                    )}
                    name="phoneMiddle"
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 4,
                      maxLength: 4,
                      onChange: (e) =>
                        setValue(
                          'phoneLast',
                          e.target.value.replace(/[^0-9]/g, ''),
                        ),
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label="입력"
                        placeholder="ex) 5678"
                        mode="outlined"
                        style={tw`bg-white mt-2 w-[30%] ml-2`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.phoneLast}
                        returnKeyType="done"
                        activeOutlineColor="#06B6D4"
                        ref={(el) => (inputRef.current[6] = el)}
                        maxLength={4}
                        keyboardType="number-pad"
                      />
                    )}
                    name="phoneLast"
                  />
                </View>
                {(errors.phoneFirst ||
                  errors.phoneMiddle ||
                  errors.phoneLast) && (
                  <Error>자녀 전화번호를 입력하세요.</Error>
                )}
              </>
            )}
            <Button
              mode="contained"
              onPress={() =>
                navigate('Certification', {
                  type: state.type,
                  authType: 'register',
                })
              }
              style={tw.style(
                ' mt-3 justify-center',
                certSuccess ? 'bg-gray-300' : 'bg-cyan-500',
              )}
              labelStyle={tw`text-base font-bold`}
              disabled={certSuccess}
            >
              {certSuccess ? '인증완료' : '본인인증'}
            </Button>
            <View style={tw`flex-row items-center justify-between mt-2`}>
              <View style={tw`flex-row items-center`}>
                <Checkbox.Android
                  status={state.checked ? 'checked' : 'unchecked'}
                  onPress={() =>
                    setState({ ...state, checked: !state.checked })
                  }
                  color="#06B6D4"
                />
                <Text
                  onPress={() =>
                    setState({ ...state, checked: !state.checked })
                  }
                >
                  약관동의
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setState({ ...state, visible: true })}
              >
                <Text style={tw`text-xs mr-2 text-gray-500`}>약관보기</Text>
              </TouchableOpacity>
            </View>
            <Portal>
              <Modal
                visible={state.visible}
                onDismiss={() => setState({ ...state, visible: false })}
                contentContainerStyle={tw`bg-white py-10 px-20 rounded-md w-11/12`}
                style={tw`items-center`}
              >
                <Text style={tw`text-xs`}>
                  약관에 동의함으로서 회원가입 시 수집한 개인정보의 보관 및
                  이용에 동의함.
                </Text>
              </Modal>
            </Portal>
            <Button
              mode="contained"
              onPress={handleSubmit(onValid)}
              style={tw.style(
                ' mt-3 justify-center mb-1',
                !certSuccess || !state.checked ? 'bg-gray-300' : 'bg-cyan-500',
              )}
              disabled={!certSuccess || !state.checked}
              labelStyle={tw`text-base font-bold`}
            >
              회원가입
            </Button>
          </View>
        )}
      </AuthLayout>
    </Provider>
  );
};

export default Register;
