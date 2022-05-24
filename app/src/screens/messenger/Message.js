import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import tw from 'twrnc';

import { listMessages, receiveMessage } from '../../modules/messenger';
import { createClient } from '../../libs/socket/client';

const Message = ({ route, navigation, navigation: { replace } }) => {
  const [client, setClient] = useState(createClient());

  const scrollViewRef = useRef();

  const dispatch = useDispatch();
  const { messengerId, receiver, messages, error, info } = useSelector(
    ({ messenger, userInfo }) => ({
      messengerId: messenger.messengerId,
      receiver: messenger.receiver,
      messages: messenger.messages,
      error: messenger.error,
      info: userInfo.info,
    }),
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (messengerId !== null) dispatch(listMessages({ messengerId }));
  }, [messengerId, dispatch, listMessages]);

  // const [testMessages, setTestMessages] = useState([
  //   {
  //     name: '멘토',
  //     message: '6 / 가장 오래된 메시지',
  //     messageTime: new Date(2022, 0, 2, 8, 0),
  //   },
  //   {
  //     name: '신해담',
  //     message: '3',
  //     messageTime: new Date(2022, 0, 3, 14, 20),
  //   },
  //   {
  //     name: '멘토',
  //     message: '5',
  //     messageTime: new Date(2022, 1, 9, 18, 17),
  //   },
  //   {
  //     name: '멘토',
  //     message: '4',
  //     messageTime: new Date(2022, 1, 9, 18, 18),
  //   },
  //   {
  //     name: '신해담',
  //     message: '2',
  //     messageTime: new Date(2022, 1, 10, 14, 10),
  //   },
  //   {
  //     name: '신해담',
  //     message: '1',
  //     messageTime: new Date(2022, 1, 10, 14, 20),
  //   },
  //   {
  //     name: '멘토',
  //     message: '3',
  //     messageTime: new Date(2022, 1, 10, 18, 18),
  //   },
  //   {
  //     name: '멘토',
  //     message: '2',
  //     messageTime: new Date(2022, 1, 10, 18, 19),
  //   },
  //   {
  //     name: '멘토',
  //     message: '1 / 가장 최근 메시지',
  //     messageTime: new Date(2022, 1, 10, 18, 20),
  //   },
  // ]);

  // 메시지 전송
  const onPress = () => {
    if (message !== '') {
      client.send(
        '/pub/chat/message',
        JSON.stringify({
          ChatRoomId: messengerId,
          message,
          sender: info?.name,
          receiver,
        }),
        {},
      );
      setMessage('');
    }
  };

  useEffect(() => {
    client.connect({}, () => {
      // 메시지 구독
      client.subscribe(`/sub/chat/room/${messengerId}`, (msg) => {
        const content = JSON.parse(msg.body);
        console.log('receive', msg);

        // 새 매시지 수신 시 리스트에 추가
        dispatch(
          receiveMessage({
            name: content.sender,
            message: content.message,
            messageTime: content.dateTime,
          }),
        );
      });
    });
    return () => {
      if (client.connected) {
        client.unsubscribe({});
        client.disconnect();
      }
    };
  }, [client, messengerId]);

  useEffect(() => {
    if (error) console.log(error.message);
  }, [error]);

  const isSameDay = (target1, target2) => {
    return (
      target1.getFullYear() === target2.getFullYear() &&
      target1.getMonth() === target2.getMonth() &&
      target1.getDate() === target2.getDate()
    );
  };

  const dateLine = messages?.map((data, i, array) =>
    isSameDay(array[i - 1]?.messageTime ?? new Date(), data.messageTime)
      ? false
      : true,
  );

  return (
    <View style={tw`w-full flex-1`}>
      <ScrollView
        style={tw`w-full flex-1 bg-blue-50`}
        showsVerticalScrollIndicator={true}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages?.map((data, i) => (
          <View key={i} style={tw`w-full flex-1 flex-col`}>
            {dateLine?.[i] && (
              <Text style={tw`flex w-full my-2 text-center`}>
                {Moment(data.messageTime).format('YYYY년 M월 D일')}
              </Text>
            )}
            {info?.name === data?.name ? (
              <View
                style={tw`my-1 mr-5 ml-auto flex flex-col rounded-md bg-sky-100 py-2 px-4 text-right`}
              >
                <Text style={tw`text-base`}>{data.message}</Text>
                <Text>{Moment(data.messageTime).format('h:mm A')}</Text>
              </View>
            ) : (
              <View
                style={tw`my-1 ml-5 mr-auto flex flex-col rounded-md bg-white py-2 px-4 text-left`}
              >
                <Text style={tw`text-base`}>{data.message}</Text>
                <Text>{Moment(data.messageTime).format('h:mm A')}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View
        style={tw`flex-row bottom-0 mx-auto flex w-full h-12 overflow-hidden bg-white border-0`}
      >
        <TextInput
          mode="flat"
          disabled={false}
          onChangeText={(text) => setMessage(text)}
          value={message}
          style={tw`flex w-5/6 bg-white border-gray-500 rounded-none justify-center`}
        />
        <TouchableOpacity
          style={tw`flex w-1/6 items-center justify-center border-0 rounded-l-none rounded-r-md bg-gray-600`}
          onPress={onPress}
        >
          <MaterialCommunityIcons name="send" size={25} color="#38bdf8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Message;
