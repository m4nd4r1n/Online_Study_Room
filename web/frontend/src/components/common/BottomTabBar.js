import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  EmojiEvents,
  Equalizer,
  Timer,
  Home,
  EventNote,
  Chat,
  Settings,
} from '@material-ui/icons';

/* 네비바 하단 고정 및 세로 길이 설정 */
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  overflow: hidden;
  border-top: 1px solid grey;
  display: flex;
  justify-content: space-around;
  overflow-x: scroll;
  --ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const BottomTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.pathname;

  const onChange = (event, value) => {
    navigate(value);
  };
  return (
    <Wrapper>
      <BottomNavigation value={value} onChange={onChange} showLabels>
        <BottomNavigationAction label="홈" value="/home" icon={<Home />} />
        <BottomNavigationAction
          label="도전과제"
          value="/achievement"
          icon={<EmojiEvents />}
        />
        <BottomNavigationAction
          label="랭킹"
          value="/ranking"
          icon={<Equalizer />}
        />
        <BottomNavigationAction
          label="타이머"
          value="/timer"
          icon={<Timer />}
        />
        <BottomNavigationAction
          label="플래너"
          value="/planner"
          icon={<EventNote />}
        />
        <BottomNavigationAction
          label="메시지"
          value="/messenger"
          icon={<Chat />}
        />
        <BottomNavigationAction
          label="설정"
          value="/setting"
          icon={<Settings />}
        />
      </BottomNavigation>
    </Wrapper>
  );
};

export default BottomTabBar;
