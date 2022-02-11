import React from 'react';
import BottomTabBar from '../components/common/BottomTabBar';
import HeaderContainer from '../containers/common/HeaderContainer';
import MessengerContainer from '../containers/messenger/MessengerContainer';

const MessengerPage = () => {
  return (
    <>
      <HeaderContainer title="메시지" back />
      <MessengerContainer />
      <BottomTabBar />
    </>
  );
};

export default MessengerPage;
