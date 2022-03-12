import React from 'react';
import StudyVideoContainer from '../containers/study/StudyVideoContainer';
import Layout from '../components/common/Layout';

const StudyPage = () => {
  return (
    <Layout title="학습 중..." counter back={false}>
      <StudyVideoContainer />
    </Layout>
  );
};

export default StudyPage;
