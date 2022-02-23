import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MainContainer from '../containers/main/MainContainer';

const HomePage = () => {
  return (
    <>
      <HeaderContainer title="Main" back={false} />
      <MainContainer />
    </>
  );
};

export default HomePage;
