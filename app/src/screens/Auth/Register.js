import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import tw from 'twrnc';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Register = () => {
  return (
    <View style={tw`bg-gray-200 items-center flex-1 justify-center`}>
      <View
        style={tw.style('p-8 shadow-md rounded-sm bg-white', {
          width: (SCREEN_WIDTH / 20) * 19,
        })}
      >
        <Text>회원가입</Text>
      </View>
    </View>
  );
};

export default Register;
