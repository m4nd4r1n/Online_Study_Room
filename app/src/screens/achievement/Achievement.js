import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import achievementData from './achievement_list.json';
import tw from 'twrnc';
import { ContentsBlock } from '../../components/common/Contents';

const Achievement = () => {
  const data = achievementData.normal;
  return (
    <ContentsBlock>
      <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
        {data?.map((data) => (
          <View
            key={data.id}
            style={tw`w-full flex-row items-center border-b px-4 py-4 border-gray-300`}
          >
            <MaterialCommunityIcons name="trophy" size={24} color="#06B6D4" />
            <View style={tw`ml-4 justify-start text-left`}>
              <Text style={tw`font-bold mb-2`}>{data.title}</Text>
              <Text>{data.description}</Text>
              <Text>{data.exp}XP</Text>
            </View>
            <Text style={tw`ml-auto`}>미달성</Text>
          </View>
        ))}
      </ScrollView>
    </ContentsBlock>
  );
};

export default Achievement;
