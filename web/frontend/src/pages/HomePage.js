import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import MainContainer from '../containers/main/MainContainer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>홈</title>
      </Helmet>
      <HeaderContainer title="Main" back={false} />
      <MainContainer />
    </>
  );
};

export default HomePage;
