import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import FindForm from '../containers/auth/FindForm';
import HeaderContainer from '../containers/common/HeaderContainer';

const FindPage = () => {
  return (
    <>
      <HeaderContainer title="찾기" back />
      <AuthTemplate center>
        <FindForm />
      </AuthTemplate>
    </>
  );
};

export default FindPage;
