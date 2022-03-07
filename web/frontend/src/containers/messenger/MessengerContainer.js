/**
 * 메신저 컨테이너
 */

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeMessenger,
  listMessages,
  sendMessage,
  receiveMessage,
  subscribe,
  unsubscribe,
} from '../../modules/messenger';
import { useParams } from 'react-router';
import Message from '../../components/message/Message';

const MessageContainer = () => {
  const { messengerId } = useParams();
  const dispatch = useDispatch();
  const { messages, message, subscription, error } = useSelector(
    ({ messenger }) => ({
      messages: messenger.messages,
      message: messenger.message,
      subscription: messenger.subscription,
      error: messenger.error,
    }),
  );

  const user = { name: '김겨울' };
  const test_messages = [
    {
      name: '멘토',
      message: '6 / 가장 오래된 메시지',
      messageTime: new Date(2022, 0, 2, 8, 0),
    },
    {
      name: '김겨울',
      message: '3',
      messageTime: new Date(2022, 0, 3, 14, 20),
    },
    {
      name: '멘토',
      message: '5',
      messageTime: new Date(2022, 1, 9, 18, 17),
    },
    {
      name: '멘토',
      message: '4',
      messageTime: new Date(2022, 1, 9, 18, 18),
    },
    {
      name: '김겨울',
      message: '2',
      messageTime: new Date(2022, 1, 10, 14, 10),
    },
    {
      name: '김겨울',
      message: '1',
      messageTime: new Date(2022, 1, 10, 14, 20),
    },
    {
      name: '멘토',
      message: '3',
      messageTime: new Date(2022, 1, 10, 18, 18),
    },
    {
      name: '멘토',
      message: '2',
      messageTime: new Date(2022, 1, 10, 18, 19),
    },
    {
      name: '멘토',
      message: '1 / 가장 최근 메시지',
      messageTime: new Date(2022, 1, 10, 18, 20),
    },
  ];

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const message = e.target.value;
    dispatch(changeField({ message }));
  };

  const onClick = () => {
    if ([message].includes('')) return;
    dispatch(sendMessage({ messengerId, message }));
  };

  // 메시지 수신 이벤트 핸들러
  const onMessage = useCallback(
    (message) => {
      if (message.body) {
        dispatch(receiveMessage({ message: JSON.parse(message.body) }));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(initializeMessenger());
    dispatch(listMessages({ messengerId }));
    dispatch(subscribe({ messengerId, onMessage }));
    return unsubscribe();
  }, [dispatch, messengerId, onMessage]);

  useEffect(() => {
    if (error) console.log(error.message);
  }, [error]);

  return (
    <Message
      user={user}
      messages={test_messages}
      onChange={onChange}
      onClick={onClick}
      message={message}
    />
  );
};

export default MessageContainer;
