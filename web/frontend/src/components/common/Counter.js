import React, { useState, useEffect, useCallback } from 'react';
import useInterval from '../timer/useInterval';
import { StyledText } from './Contents';

const Counter = ({ inputTime }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [pause, setPause] = useState(true);
  const [delay, setDelay] = useState(1000);

  // 타이머 일시정지 or 재개
  const pauseTimer = () => {
    setPause(!pause);
  };

  // 카운트 콜백함수
  const count = useCallback(() => {
    setSeconds(seconds + 1); // 초 + 1

    if (seconds === 59) {
      if (minutes === 59) {
        // 분 초 59
        setHours(hours + 1); // 시 + 1
        setMinutes(0);
        setSeconds(0);
      }
      // 초 59
      else {
        setMinutes(minutes + 1); // 분 + 1
        setSeconds(0);
      }
    }
  }, [seconds, minutes, hours]);

  useInterval(() => {
    count();
  }, delay);

  useEffect(() => {
    if (pause) setDelay(null);
    else setDelay(1000);
  }, [pause]);

  useEffect(() => {
    if (!inputTime) setPause(false);
  }, [inputTime]);

  return (
    <StyledText center size="1.2rem">
      {hours < 10 ? `0${hours}` : hours}:
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </StyledText>
  );
};

export default Counter;
