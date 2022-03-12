import React from 'react';
import MainContainer from '../containers/main/MainContainer';
import Layout from '../components/common/Layout';

const HomePage = () => {
  return (
    <Layout title="홈" back={false}>
      <MainContainer />
    </Layout>
  );
};

export default HomePage;
