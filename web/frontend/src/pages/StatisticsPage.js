import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import StatisticsContainer from '../containers/statistics/StatisticsContainer';

const StatisticsPage = () => {
  return (
    <>
      <HeaderContainer title="학습 통계" back />
      <StatisticsContainer />
    </>
  );
};

export default StatisticsPage;
