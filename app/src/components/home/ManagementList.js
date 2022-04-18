import React from 'react';
import tw from 'twrnc';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ManagementList = () => {
  const {
    params: { id },
  } = useRoute();
  const { navigate } = useNavigation();
  return (
    <>
      <View style={tw`flex-row w-full border-b h-16 border-gray-300`}>
        <TouchableOpacity
          style={tw`text-base flex-row justify-around w-full items-center`}
          onPress={() => {}}
        >
          <MaterialCommunityIcons name="video" size={36} color="black" />
          <Text>학습화면 확인</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row w-full border-b h-16 border-gray-300`}>
        <TouchableOpacity
          style={tw`text-base flex-row justify-around w-full items-center`}
          onPress={() => navigate('StudyTime', { id })}
        >
          <MaterialCommunityIcons name="lead-pencil" size={36} color="black" />
          <Text>학습시간 확인</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ManagementList;
