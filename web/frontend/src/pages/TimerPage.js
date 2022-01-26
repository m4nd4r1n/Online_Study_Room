import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import TimerContainer from '../containers/timer/TimerContainer';
import BottomTabBar from '../components/common/BottomTabBar';

const TimerPage = () => {
  return (
    <>
      <HeaderContainer title="타이머" back />
      <TimerContainer />
      <BottomTabBar />
    </>
  );
};

export default TimerPage;
