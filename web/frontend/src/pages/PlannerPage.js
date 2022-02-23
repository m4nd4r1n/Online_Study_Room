import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PlannerContainer from '../containers/planner/PlannerContainer';

const PlannerPage = () => {
  return (
    <>
      <HeaderContainer title="플래너" back />
      <PlannerContainer />
    </>
  );
};

export default PlannerPage;
