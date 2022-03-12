import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import FindForm from '../containers/auth/FindForm';
import Layout from '../components/common/Layout';

const FindPage = () => {
  return (
    <Layout title="찾기">
      <AuthTemplate center>
        <FindForm />
      </AuthTemplate>
    </Layout>
  );
};

export default FindPage;
