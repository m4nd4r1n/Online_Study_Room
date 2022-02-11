import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MessageContainer from '../containers/message/MessageContainer';

const MessagePage = () => {
  return (
    <>
      <HeaderContainer title="메시지" back />
      <MessageContainer />
    </>
  );
};

export default MessagePage;
