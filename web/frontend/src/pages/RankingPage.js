import React from 'react';
import RankingContainer from '../containers/ranking/RankingContainer';
import Layout from '../components/common/Layout';

const RankingPage = () => {
  return (
    <Layout title="랭킹">
      <RankingContainer />
    </Layout>
  );
};

export default RankingPage;
