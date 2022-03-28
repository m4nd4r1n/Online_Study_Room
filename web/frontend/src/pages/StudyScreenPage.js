import React from 'react';
import StudyVideoContainer from '../containers/study/StudyVideoContainer';
import Layout from '../components/common/Layout';

const StudyScreenPage = () => {
  return (
    <Layout title="" counter back={true}>
      <StudyVideoContainer />
    </Layout>
  );
};

export default StudyScreenPage;
