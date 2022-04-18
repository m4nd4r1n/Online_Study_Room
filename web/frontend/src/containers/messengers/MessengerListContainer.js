/**
 * 메신저리스트 컨테이너
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listMessengers } from '../../modules/messengers';
import Messenger from '../../components/messenger/Messenger';

const MessengerListContainer = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    !user && navigate('/login');
  });

  useEffect(() => {
    dispatch(listMessengers());
  }, [dispatch]);

  return <Messenger messengers={test_messengers} />;
};

export default MessengerListContainer;
