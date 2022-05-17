import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
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
  AssessmentOutlined,
} from '@material-ui/icons';

/* 네비바 하단 고정 및 세로 길이 설정 */
const Wrapper = styled.div`
  --ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    width: 0 !important;
  }
`;

const TwWrapper = tw(Wrapper)`
  fixed
  bottom-0
  flex
  h-[50px]
  w-full
  overflow-y-hidden
  overflow-x-scroll
  border-t-[0.5px]
  border-gray-400
  bg-white
  sm:justify-center
`;

const BottomTabBar = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.pathname.split('/');

  const onChange = (_, value) => {
    navigate(value);
  };
  return (
    <TwWrapper>
      <BottomNavigation value={'/' + value[1]} onChange={onChange} showLabels>
        <BottomNavigationAction label="홈" value="/" icon={<Home />} />
        {type === 'mentee' && (
          <BottomNavigationAction
            label="도전과제"
            value="/achievement"
            icon={<EmojiEvents />}
          />
        )}
        {type === 'mentee' && (
          <BottomNavigationAction
            label="랭킹"
            value="/ranking"
            icon={<Equalizer />}
          />
        )}
        {type === 'mentee' && (
          <BottomNavigationAction
            label="타이머"
            value="/timer"
            icon={<Timer />}
          />
        )}
        {type !== 'parent' && (
          <BottomNavigationAction
            label="플래너"
            value="/planner"
            icon={<EventNote />}
          />
        )}
        {type !== 'parent' && (
          <BottomNavigationAction
            label="메시지"
            value="/messenger"
            icon={<Chat />}
          />
        )}
        <BottomNavigationAction
          label="학습통계"
          value="/statistics"
          icon={<AssessmentOutlined />}
        />
        <BottomNavigationAction
          label="설정"
          value="/setting"
          icon={<Settings />}
        />
      </BottomNavigation>
    </TwWrapper>
  );
};

export default BottomTabBar;
