import React from 'react';
import Layout from '../components/common/Layout';
import AdminContainer from '../containers/admin/AdminContainer';

const AdminPage = () => {
  return (
    <Layout title="관리자 페이지" back={false}>
      <AdminContainer />
    </Layout>
  );
};

export default AdminPage;
