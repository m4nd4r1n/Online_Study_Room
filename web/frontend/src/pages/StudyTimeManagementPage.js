import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import StudyTimeContainer from '../containers/management/StudyTimeContainer';

const StudyTimeManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>학습시간 관리</title>
      </Helmet>
      <HeaderContainer title="학습시간 관리" back />
      <StudyTimeContainer />
    </>
  );
};

export default StudyTimeManagementPage;
