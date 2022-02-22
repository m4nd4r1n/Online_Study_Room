import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import TimerContainer from '../containers/timer/TimerContainer';

const TimerPage = () => {
  return (
    <>
      <HeaderContainer title="타이머" back />
      <TimerContainer />
    </>
  );
};

export default TimerPage;
