import React from 'react';
import tw from 'twrnc';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StudentInfo from '../../components/home/StudentInfo';
import { ContentsBlock } from '../../components/common/Contents';

const StudyTime = () => {
  const testStudentInfo = {
    school: '광운고등학교',
    name: '김광운',
  };

  const testStudyTime = [
    {
      time: new Date(),
      image: new Blob(),
    },
    {
      time: new Date(),
      image: new Blob(),
    },
  ];
  return (
    <ContentsBlock center={false}>
      <StudentInfo studentInfo={testStudentInfo} />
      <View
        style={tw`bg-gray-300 h-12 w-full rounded flex-row justify-center items-center`}
      >
        <Text style={tw`flex-1 text-center`}>미인식 시점</Text>
        <Text style={tw`flex-1 text-center`}>캡쳐 화면</Text>
        <Text style={tw`flex-1 text-center`}>학습시간 인정</Text>
      </View>
      {testStudyTime.map((data, index) => (
        <View
          style={tw`h-16 w-full flex-row justify-center items-center border-b border-gray-400`}
          key={index}
        >
          <Text style={tw`flex-1 text-center`}>
            {data.time.toLocaleString()}
          </Text>
          <Image style={tw`flex-1`} source={{ uri: data.image._data.blobId }} />
          <TouchableOpacity style={tw`flex-1 items-center`}>
            <MaterialCommunityIcons name="check" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </ContentsBlock>
  );
};

export default StudyTime;
