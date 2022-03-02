import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import RankingContainer from '../containers/ranking/RankingContainer';

const RankingPage = () => {
  return (
    <>
      <Helmet>
        <title>랭킹</title>
      </Helmet>
      <HeaderContainer title="랭킹" back />
      <RankingContainer />
    </>
  );
};

export default RankingPage;
