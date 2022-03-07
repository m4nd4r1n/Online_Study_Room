import React from 'react';
import { Helmet } from 'react-helmet-async';
import AchievementContainer from '../containers/achievement/AchievementContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const AchievementPage = () => {
  return (
    <>
      <Helmet>
        <title>도전과제</title>
      </Helmet>
      <HeaderContainer title="도전과제" back />
      <AchievementContainer />
    </>
  );
};

export default AchievementPage;
