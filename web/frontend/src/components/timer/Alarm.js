import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import useInterval from './useInterval';

const StyledTimer = styled.div`
  display: flex;
  font-size: 2.5rem;
`;

const audio = new Audio('sound/alert.mp3');

const Alarm = ({ onClickTimer, hh, mm, ss }) => {
  const date = new Date();
  const [hours, setHours] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());
  const [delay, setDelay] = useState(1000);

  // 카운트다운 콜백함수
  const countdown = useCallback(() => {
    setSeconds(seconds + 1);
    if (seconds === 59) {
      if (minutes === 59) {
        // 23시 59분 60초
        if (hours === 23) {
          setHours(0);
          setMinutes(0);
          setSeconds(0);
        }
        // 59분 60초
        else {
          setHours(hours + 1);
          setMinutes(0);
          setSeconds(0);
        }
      }
      // 60초
      else {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }
    if (hours === hh && minutes === mm && seconds === ss) {
      setDelay(null);
      audio.play();
      alert('목표 시간 달성!!');
    }
  }, [seconds, minutes, hours, hh, mm, ss]);

  useInterval(() => {
    countdown();
  }, delay);

  return (
    <>
      <StyledTimer>
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </StyledTimer>
      <div style={{ flexDirection: 'row', marginTop: '10px' }}>
        <Button onClick={() => setDelay(null)} style={{ marginRight: '5px' }}>
          정지
        </Button>
        <Button onClick={onClickTimer}>취소</Button>
      </div>
    </>
  );
};

export default Alarm;
