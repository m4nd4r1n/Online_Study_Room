/**
 * 메신저 컨테이너
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listMessages } from '../../modules/messenger';
import { useParams } from 'react-router';
import Message from '../../components/message/Message';
import { createClient } from '../../lib/socket/client';

const MessageContainer = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState(createClient());

  const { messengerId } = useParams();
  const dispatch = useDispatch();
  const { messages, error, user } = useSelector(({ messenger, user }) => ({
    messages: messenger.messages,
    error: messenger.error,
    user: user.user,
  }));

  const [message, setMessage] = useState('');

  const [testUser, setTestUser] = useState({ name: '김겨울' });
  const [testMessages, setTestMessages] = useState([
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
  ]);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // 메시지 전송
  const onClick = (e) => {
    client.send(
      '/pub/chat/message',
      JSON.stringify({ messengerId, message, writer: testUser.name }),
      {},
    );
    setMessage('');
  };

  useEffect(() => {
    !user && navigate('/login');
  });

  // 존재하는 메시지 리스트 로드
  useEffect(() => {
    dispatch(listMessages({ messengerId }));
  }, [dispatch, messengerId]);

  useEffect(() => {
    client.connect({}, () => {
      // 메시지 구독
      client.subscribe(`/sub/chat/room/${messengerId}`, (msg) => {
        const content = JSON.parse(msg.body);

        // 새 매시지 수신 시 리스트에 추가
        setTestMessages((prev) => [
          ...prev,
          {
            name: content.writer,
            message: content.message,
            messageTime: new Date(),
          },
        ]);
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

  return (
    <Message
      user={testUser}
      message={message}
      messages={testMessages}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export default MessageContainer;
