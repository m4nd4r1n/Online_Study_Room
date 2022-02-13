import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import useInterval from './useInterval';
import useNotification from './useNotification';

const StyledTimer = styled.div`
  display: flex;
  font-size: 2.5rem;
`;

const Timer = ({ onClickTimer, inputTime, time }) => {
  const [hours, setHours] = useState(time.hours);
  const [minutes, setMinutes] = useState(time.minutes);
  const [seconds, setSeconds] = useState(time.seconds);

  const [pause, setPause] = useState(true);
  const [delay, setDelay] = useState(1000);

  const { fireNotification } = useNotification();

  // 타이머 일시정지 or 재개
  const pauseTimer = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) onClickTimer();
    setPause(!pause);
  };

  // 카운트다운 콜백함수
  const countdown = useCallback(() => {
    if (minutes >= 0 && seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        // 시 분 초 0
        if (hours === 0) {
          setPause(true);
          const audio = new Audio('sound/alert.mp3');
          audio.play();
          fireNotification('Online Study', {
            body: '타임아웃!!',
          });
        }
        // 분 초 0
        else {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }
      // 초 0
      else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }
  }, [seconds, minutes, hours, fireNotification]);

  useInterval(() => {
    countdown();
  }, delay);

  useEffect(() => {
    if (pause) setDelay(null);
    else setDelay(1000);
  }, [pause]);

  useEffect(() => {
    if (!inputTime) setPause(false);
  }, [inputTime]);

  return (
    <>
      <StyledTimer>
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </StyledTimer>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
        <Button onClick={pauseTimer} style={{ marginRight: '5px' }}>
          {pause ? '재개' : '일시정지'}
        </Button>
        <Button onClick={onClickTimer}>취소</Button>
      </div>
    </>
  );
};

export default Timer;
