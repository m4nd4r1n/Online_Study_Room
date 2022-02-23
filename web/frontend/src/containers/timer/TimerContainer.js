/**
 * 타이머 페이지 컨테이너
 */

import React, { useState, useEffect } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import Timer from '../../components/timer/Timer';
import InputTime from '../../components/timer/InputTime';
import Alarm from '../../components/timer/Alarm';

const TimerContainer = () => {
  const [inputTime, setInputTime] = useState(true);
  const [isTimer, setIsTimer] = useState(true);

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 타이머 시작/취소
  const onClickTimer = () => {
    setInputTime(!inputTime);
  };

  const changeTimer = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsTimer(!isTimer);
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  });

  return (
    <ContentsBlock
      style={{ display: 'flex', height: '80vh', flexDirection: 'column' }}
    >
      {inputTime ? (
        <InputTime
          changeTimer={changeTimer}
          isTimer={isTimer}
          onClickTimer={onClickTimer}
          time={time}
          setTime={setTime}
        />
      ) : isTimer ? (
        <Timer onClickTimer={onClickTimer} inputTime={inputTime} time={time} />
      ) : (
        <Alarm onClickTimer={onClickTimer} time={time} />
      )}
    </ContentsBlock>
  );
};

export default TimerContainer;
