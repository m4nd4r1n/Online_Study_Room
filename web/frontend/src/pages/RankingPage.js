import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import RankingContainer from '../containers/ranking/RankingContainer';

const RankingPage = () => {
  return (
    <>
      <HeaderContainer title="랭킹" back />
      <RankingContainer />
    </>
  );
};

export default RankingPage;
