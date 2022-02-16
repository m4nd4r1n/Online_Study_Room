import React from 'react';
import BottomTabBar from '../components/common/BottomTabBar';
import HeaderContainer from '../containers/common/HeaderContainer';
import StatisticsContainer from '../containers/statistics/StatisticsContainer';

const StatisticsPage = () => {
  return (
    <>
      <HeaderContainer title="학습 통계" back />
      <StatisticsContainer />
      <BottomTabBar />
    </>
  );
};

export default StatisticsPage;
