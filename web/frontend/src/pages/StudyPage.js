import React from 'react';
import StudyVideoContainer from '../containers/study/StudyVideoContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import { Helmet } from 'react-helmet-async';

const StudyPage = () => {
  return (
    <>
      <Helmet>
        <title>학습 중</title>
      </Helmet>
      <HeaderContainer counter />
      <StudyVideoContainer />
    </>
  );
};

export default StudyPage;
