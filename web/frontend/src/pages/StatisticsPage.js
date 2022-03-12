import React from 'react';
import StatisticsContainer from '../containers/statistics/StatisticsContainer';
import Layout from '../components/common/Layout';

const StatisticsPage = () => {
  return (
    <Layout title="학습 통계">
      <StatisticsContainer />
    </Layout>
  );
};

export default StatisticsPage;
