import React from 'react';
import Layout from '../components/common/Layout';
import ChatContainer from '../containers/chat/ChatContainer';

const ChatPage = () => {
  return (
    <Layout title="메시지">
      <ChatContainer />
    </Layout>
  );
};

export default ChatPage;
