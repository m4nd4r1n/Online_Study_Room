import React from 'react';
import MessengerContainer from '../containers/messengers/MessengerListContainer';
import Layout from '../components/common/Layout';

const MessengerListPage = () => {
  return (
    <Layout title="메시지">
      <MessengerContainer />
    </Layout>
  );
};

export default MessengerListPage;
