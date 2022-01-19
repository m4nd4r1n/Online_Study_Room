import React from 'react';
import Button from '../common/Button';
import { StyledInput } from '../common/Input';

const InputTime = ({ changeTimer, isTimer, onClickTimer, setTime, time }) => {
  return (
    <>
      <div
        style={{
          flexDirection: 'row',
          fontSize: '2.5rem',
        }}
      >
        <StyledInput
          type="number"
          name="hours"
          min="0"
          max="99"
          maxLength={2}
          style={{ border: 'none', width: '18%', fontSize: '2.5rem' }}
          placeholder="시"
          value={time.hours}
          onChange={(e) => {
            if (isTimer && e.target.value > 5) e.target.value = 5;
            if (!isTimer && e.target.value > 23) e.target.value = 23;
            setTime({ ...time, hours: parseInt(e.target.value) });
          }}
        />
        <span>:</span>
        <StyledInput
          type="number"
          name="minuts"
          min="0"
          max="59"
          maxLength={2}
          style={{ border: 'none', width: '18%', fontSize: '2.5rem' }}
          placeholder="분"
          value={time.minutes}
          onChange={(e) => {
            if (e.target.value > 59) e.target.value = 59;
            setTime({ ...time, minutes: parseInt(e.target.value) });
          }}
        />
        <span>:</span>
        <StyledInput
          type="number"
          name="seconds"
          min="0"
          max="59"
          maxLength={2}
          style={{ border: 'none', width: '18%', fontSize: '2.5rem' }}
          placeholder="초"
          value={time.seconds}
          onChange={(e) => {
            if (e.target.value > 59) e.target.value = 59;
            setTime({ ...time, seconds: parseInt(e.target.value) });
          }}
        />
      </div>
      <div style={{ flexDirection: 'row', marginTop: '10px' }}>
        <Button onClick={changeTimer} style={{ marginRight: '5px' }}>
          {isTimer ? '타이머' : '알람'}
        </Button>
        <Button onClick={onClickTimer}>시작</Button>
      </div>
    </>
  );
};

export default InputTime;
