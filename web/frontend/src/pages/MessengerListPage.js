import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import MessengerContainer from '../containers/messengers/MessengerListContainer';

const MessengerListPage = () => {
  return (
    <>
      <Helmet>
        <title>메시지</title>
      </Helmet>
      <HeaderContainer title="메시지" back />
      <MessengerContainer />
    </>
  );
};

export default MessengerListPage;
