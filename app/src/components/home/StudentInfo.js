import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const StudentInfo = ({ studentInfo }) => {
  return (
    <View
      style={tw`flex-row justify-around w-full items-center text-center h-12 mb-4 border-b`}
    >
      <Text>{studentInfo.school}</Text>
      <Text>{studentInfo.name} 학생</Text>
    </View>
  );
};

export default StudentInfo;
