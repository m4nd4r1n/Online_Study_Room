import React from 'react';
import ManagementContainer from '../containers/management/ManagementContainer';
import Layout from '../components/common/Layout';

const MenteeManagementPage = () => {
  return (
    <Layout title="멘티 관리">
      <ManagementContainer />
    </Layout>
  );
};

export default MenteeManagementPage;
