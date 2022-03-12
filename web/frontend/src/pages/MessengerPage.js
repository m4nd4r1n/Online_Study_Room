import React from 'react';
import MessengerContainer from '../containers/messenger/MessengerContainer';
import Layout from '../components/common/Layout';

const MessengerPage = () => {
  return (
    <Layout title="메시지">
      <MessengerContainer />
    </Layout>
  );
};

export default MessengerPage;
