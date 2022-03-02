import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import TimerContainer from '../containers/timer/TimerContainer';

const TimerPage = () => {
  return (
    <>
      <Helmet>
        <title>타이머</title>
      </Helmet>
      <HeaderContainer title="타이머" back />
      <TimerContainer />
    </>
  );
};

export default TimerPage;
