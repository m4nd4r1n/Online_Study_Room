import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import PlannerContainer from '../containers/planner/PlannerContainer';

const PlannerPage = () => {
  return (
    <>
      <Helmet>
        <title>플래너</title>
      </Helmet>
      <HeaderContainer title="플래너" back />
      <PlannerContainer />
    </>
  );
};

export default PlannerPage;
