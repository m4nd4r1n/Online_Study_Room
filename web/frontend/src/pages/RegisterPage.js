import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';
import HeaderContainer from '../containers/common/HeaderContainer';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <HeaderContainer title="회원가입" back />
      <AuthTemplate center>
        <RegisterForm />
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
