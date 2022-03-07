import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import ManagementContainer from '../containers/management/ManagementContainer';

const MenteeManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>멘티 관리</title>
      </Helmet>
      <HeaderContainer title="멘티 관리" back />
      <ManagementContainer />
    </>
  );
};

export default MenteeManagementPage;
