import React, { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listMessengers } from '../../modules/messengers';
import Moment from 'moment';
import tw from 'twrnc';
import { setMessengerId } from '../../modules/messenger';

const isToday = (target) => {
  const today = new Date();

  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
};

const Messenger = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const { messengers, error, user } = useSelector(({ messengers, user }) => ({
    messengers: messengers.messengers,
    user: user.user,
  }));

  useEffect(() => {
    dispatch(listMessengers());
  }, [dispatch]);

  return (
    <ScrollView
      style={tw`w-full bg-white`}
      showsVerticalScrollIndicator={false}
    >
      {messengers?.map((data, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex w-full flex-row items-center border-b border-gray-500 px-4 py-6 sm:px-8`}
          onPress={() => {
            dispatch(setMessengerId(data.messengerId));
            navigate(`MessageTab`, { messengerId: data.messengerId });
          }}
        >
          <View style={tw`ml-4 flex flex-col justify-start text-left`}>
            <Text style={tw`text-base font-bold`}>{data.messengerTitle}</Text>
            <Text style={tw`text-sm`}>{data.lastMessage}</Text>
          </View>
          <Text style={tw`ml-auto`}>
            {isToday(new Date(data.lastReceivedTime.getTime()))
              ? Moment(data.lastReceivedTime).format('h:mm A')
              : Moment(data.lastReceivedTime).format('YYYY.MM.DD')}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Messenger;
