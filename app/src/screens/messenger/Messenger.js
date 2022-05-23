import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import tw from 'twrnc';

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
  const test_messengers = [
    {
      messengerId: '0fxca1253',
      messengerTitle: '오픈 스카이',
      lastMessage: '2021년 10월 15일 학습 결과 보고서',
      lastReceivedTime: new Date(2022, 1, 1),
    },
    {
      messengerId: 'mlqwnr27',
      messengerTitle: '멘토',
      lastMessage: '플래너 작성은 다 하셨나요?',
      lastReceivedTime: new Date(2022, 1, 6),
    },
    {
      messengerId: 'd12jut06',
      messengerTitle: '고길동',
      lastMessage: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
      lastReceivedTime: new Date(),
    },
  ];
  return (
    <ScrollView
      style={tw`w-full bg-white`}
      showsVerticalScrollIndicator={false}
    >
      {test_messengers.map((data, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex w-full flex-row items-center border-b border-gray-500 px-4 py-6 sm:px-8`}
          onPress={() =>
            navigate(`MessageTab`, { messengerId: data.messengerId })
          }
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
