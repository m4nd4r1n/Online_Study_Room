import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';
import Layout from '../components/common/Layout';

const RegisterPage = () => {
  return (
    <Layout title="회원가입">
      <AuthTemplate center>
        <RegisterForm />
      </AuthTemplate>
    </Layout>
  );
};

export default RegisterPage;
