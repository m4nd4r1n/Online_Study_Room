/**
 * 메시지 컨테이너
 */

import React from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import MessageList from '../../components/message/MessageList';
import SendMessage from '../../components/message/SendMessage';

const MessageContainer = () => {
  const user = { name: '김겨울' };
  const messages = [
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

  return (
    <ContentsBlock>
      <MessageList user={user} messages={messages} />
      <SendMessage />
    </ContentsBlock>
  );
};

export default MessageContainer;
