import React from 'react';
import StudyTimeContainer from '../containers/management/StudyTimeContainer';
import Layout from '../components/common/Layout';

const StudyTimeManagementPage = () => {
  return (
    <Layout title="학습 관리">
      <StudyTimeContainer />
    </Layout>
  );
};

export default StudyTimeManagementPage;
