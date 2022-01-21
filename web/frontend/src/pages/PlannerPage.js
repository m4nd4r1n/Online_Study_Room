import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PlannerContainer from '../containers/planner/PlannerContainer';
import BottomTabBar from '../components/common/BottomTabBar';

const PlannerPage = () => {
  return (
    <>
      <HeaderContainer title="플래너" />
      <PlannerContainer />
      <BottomTabBar />
    </>
  );
};

export default PlannerPage;
