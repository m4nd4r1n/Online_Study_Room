import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMessengerId } from '../../modules/messenger';

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
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
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
        <TouchableOpacity onPress={() => navigate('Management', { id })}>
          <MaterialCommunityIcons name="account-cog" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('PlannerTab', { id })}>
          <MaterialCommunityIcons
            name="calendar-text"
            size={36}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(setMessengerId({ messengerId, receiver: name }));
            navigate('MessageTab', { messengerId });
          }}
        >
          <MaterialCommunityIcons name="message-text" size={36} color="black" />
        </TouchableOpacity>
      </Item>
      <Item borderRight={false}>
        <Text>{state}</Text>
      </Item>
    </View>
  );
};

const MenteeList = ({ mentees }) => {
  return (
    <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
      {mentees?.map((mentee, index) => (
        <Mentee key={index} mentee={mentee} />
      ))}
    </ScrollView>
  );
};

export default MenteeList;
