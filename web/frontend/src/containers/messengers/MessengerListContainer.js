/**
 * 메신저리스트 컨테이너
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMessengers } from '../../modules/messengers';
import { ContentsBlock } from '../../components/common/Contents';
import MessengerList from '../../components/messenger/MessengerList';

const MessengerContainer = () => {
  const dispatch = useDispatch();
  const { messengers, error } = useSelector(({ messengers }) => ({
    messengers: messengers.messengers,
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
    dispatch(listMessengers());
  }, [dispatch]);

  return (
    <ContentsBlock>
      <MessengerList messengers={test_messengers} />
    </ContentsBlock>
  );
};

export default MessengerContainer;
