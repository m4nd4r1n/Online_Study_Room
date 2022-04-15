import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';

const Item = ({ wide = false, borderRight = true, children }) => (
  <View
    style={tw.style(
      `flex-row h-3/5 text-center items-center`,
      borderRight ? 'border-r border-gray-200' : '',
      wide ? 'flex-2 justify-around' : 'flex-1 justify-center',
    )}
  >
    {children}
  </View>
);

const Child = ({ child }) => {
  const { name, school, id, state } = child;

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
          <MaterialCommunityIcons name="video" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons
            name="file-document"
            size={36}
            color="black"
          />
        </TouchableOpacity>
      </Item>
      <Item borderRight={false}>
        <Text>{state}</Text>
      </Item>
    </View>
  );
};

const ChildrenList = () => {
  const children = [
    {
      id: '1234',
      school: '서울중',
      name: '박서울',
      state: '학습중',
    },
    {
      id: '5678',
      school: '부산고',
      name: '김부산',
      state: '오프라인',
    },
  ];

  return (
    <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
      {children.map((child, index) => (
        <Child key={index} child={child} />
      ))}
    </ScrollView>
  );
};

export default ChildrenList;
