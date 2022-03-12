import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
import Layout from '../components/common/Layout';

const LoginPage = () => {
  return (
    <Layout title="로그인" back={false}>
      <AuthTemplate center>
        <LoginForm />
      </AuthTemplate>
    </Layout>
  );
};

export default LoginPage;
