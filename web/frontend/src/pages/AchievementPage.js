import React from 'react';
import BottomTabBar from '../components/common/BottomTabBar';
import AchievementContainer from '../containers/achievement/AchievementContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const AchievementPage = () => {
  return (
    <>
      <HeaderContainer title="도전과제" back />
      <AchievementContainer />
      <BottomTabBar />
    </>
  );
};

export default AchievementPage;
