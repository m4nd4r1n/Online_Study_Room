/**
 * 메신저 컨테이너
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMessages, receiveMessage } from '../../modules/messenger';
import Message from '../../components/message/Message';
import { createClient } from '../../lib/socket/client';
//import { useParams } from 'react-router';

const MessageContainer = () => {
  const [client, setClient] = useState(createClient());

  //const { messengerId } = useParams();
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
  }, [messengerId, dispatch]);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // 메시지 전송
  const onClick = (e) => {
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
  }, [client, dispatch, messengerId]);

  useEffect(() => {
    if (error) console.log(error.message);
  }, [error]);

  return (
    <Message
      info={info}
      message={message}
      messages={messages}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export default MessageContainer;
