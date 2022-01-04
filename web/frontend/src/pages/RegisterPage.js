import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';
import HeaderContainer from '../containers/common/HeaderContainer';

const RegisterPage = () => {
  return (
    <>
      <HeaderContainer title="회원가입" back />
      <AuthTemplate center>
        <RegisterForm />
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
