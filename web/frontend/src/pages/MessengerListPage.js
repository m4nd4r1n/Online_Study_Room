import React from 'react';
import MessengerListContainer from '../containers/messengers/MessengerListContainer';
import Layout from '../components/common/Layout';

const MessengerListPage = () => {
  return (
    <Layout title="메시지">
      <MessengerListContainer />
    </Layout>
  );
};

export default MessengerListPage;
