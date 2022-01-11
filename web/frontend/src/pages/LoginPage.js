import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
import HeaderContainer from '../containers/common/HeaderContainer';

const LoginPage = () => {
  return (
    <>
      <HeaderContainer title="로그인" />
      <AuthTemplate center>
        <LoginForm />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
