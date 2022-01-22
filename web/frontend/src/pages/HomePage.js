import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MainContainer from '../containers/main/MainContainer';
import BottomTabBar from '../components/common/BottomTabBar';

const HomePage = () => {
  return (
    <>
      <HeaderContainer title="Main" back={false} />
      <MainContainer />
      <BottomTabBar />
    </>
  );
};

export default HomePage;
