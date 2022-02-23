import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MessengerContainer from '../containers/messengers/MessengerListContainer';

const MessengerListPage = () => {
  return (
    <>
      <HeaderContainer title="메시지" back />
      <MessengerContainer />
    </>
  );
};

export default MessengerListPage;
