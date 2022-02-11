import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const minutesAndSeconds = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

const StyledAnchor = styled.a`
  margin-left: 1rem;
  margin-right: 1rem;
`;

const StyledMenu = styled(Menu)`
  text-align: center;
  width: 3rem;
  max-height: 200px;
  overflow: auto;
  --ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const InputTime = ({ changeTimer, isTimer, onClickTimer, setTime, time }) => {
  const hourMenu = (
    <StyledMenu onClick={(e) => setTime({ ...time, hours: parseInt(e.key) })}>
      {hours.map((value) => {
        if (isTimer) {
          if (value <= 5)
            return <StyledMenu.Item key={value}>{value}</StyledMenu.Item>;
        } else return <StyledMenu.Item key={value}>{value}</StyledMenu.Item>;
        return null;
      })}
    </StyledMenu>
  );

  const minuteMenu = (
    <StyledMenu onClick={(e) => setTime({ ...time, minutes: parseInt(e.key) })}>
      {minutesAndSeconds.map((value) => (
        <StyledMenu.Item key={value}>{value}</StyledMenu.Item>
      ))}
    </StyledMenu>
  );

  const secondMenu = (
    <StyledMenu onClick={(e) => setTime({ ...time, seconds: parseInt(e.key) })}>
      {minutesAndSeconds.map((value) => (
        <StyledMenu.Item key={value}>{value}</StyledMenu.Item>
      ))}
    </StyledMenu>
  );

  return (
    <>
      <div
        style={{
          flexDirection: 'row',
          fontSize: '2.5rem',
        }}
      >
        <Dropdown overlay={hourMenu} trigger={['click']}>
          <StyledAnchor>{time.hours}</StyledAnchor>
        </Dropdown>
        <span>:</span>
        <Dropdown overlay={minuteMenu} trigger={['click']}>
          <StyledAnchor>{time.minutes}</StyledAnchor>
        </Dropdown>
        <span>:</span>
        <Dropdown overlay={secondMenu} trigger={['click']}>
          <StyledAnchor>{time.seconds}</StyledAnchor>
        </Dropdown>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
        <Button onClick={changeTimer} style={{ marginRight: '5px' }}>
          {isTimer ? '타이머' : '알람'}
        </Button>
        <Button onClick={onClickTimer}>시작</Button>
      </div>
    </>
  );
};

export default InputTime;
