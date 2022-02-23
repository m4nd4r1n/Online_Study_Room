import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MessengerContainer from '../containers/messenger/MessengerContainer';

const MessengerPage = () => {
  return (
    <>
      <HeaderContainer title="메시지" back />
      <MessengerContainer />
    </>
  );
};

export default MessengerPage;
