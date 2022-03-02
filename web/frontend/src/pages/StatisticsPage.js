import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import StatisticsContainer from '../containers/statistics/StatisticsContainer';

const StatisticsPage = () => {
  return (
    <>
      <Helmet>
        <title>학습 통계</title>
      </Helmet>
      <HeaderContainer title="학습 통계" back />
      <StatisticsContainer />
    </>
  );
};

export default StatisticsPage;
