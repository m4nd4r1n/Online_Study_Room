import React from 'react';
import TimerContainer from '../containers/timer/TimerContainer';
import Layout from '../components/common/Layout';

const TimerPage = () => {
  return (
    <Layout title="타이머">
      <TimerContainer />
    </Layout>
  );
};

export default TimerPage;
