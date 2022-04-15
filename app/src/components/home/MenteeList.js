import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';

const Item = ({ wide = false, borderRight = true, children }) => (
  <View
    style={tw.style(
      `flex-row h-3/5 text-center items-center`,
      borderRight ? 'border-r border-gray-200' : '',
      wide ? 'flex-3 justify-around' : 'flex-1 justify-center',
    )}
  >
    {children}
  </View>
);

const Mentee = ({ mentee }) => {
  const { name, school, id, messengerId, state } = mentee;

  return (
    <View
      style={tw`flex-row h-20 w-full items-center justify-between border-b border-gray-300 text-center sm:px-4`}
    >
      <Item>
        <Text>{name}</Text>
      </Item>
      <Item>
        <Text>{school}</Text>
      </Item>
      <Item wide>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name="account-cog" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons
            name="calendar-text"
            size={36}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name="message-text" size={36} color="black" />
        </TouchableOpacity>
      </Item>
      <Item borderRight={false}>
        <Text>{state}</Text>
      </Item>
    </View>
  );
};

const MenteeList = () => {
  const mentees = [
    {
      id: '1234',
      school: '서울중',
      name: '박서울',
      state: '학습중',
      messengerId: 'messengerId1',
    },
    {
      id: '5678',
      school: '부산고',
      name: '김부산',
      state: '오프라인',
      messengerId: 'messengerId2',
    },
  ];

  return (
    <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
      {mentees.map((mentee, index) => (
        <Mentee key={index} mentee={mentee} />
      ))}
    </ScrollView>
  );
};

export default MenteeList;
