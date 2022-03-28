import React from 'react';
import { useParams } from 'react-router-dom';
import ObjectDetector from '../../components/study/ObjectDetector';
import VideoViewer from '../../components/study/VideoViewer';

const StudyVideoContainer = () => {
  const { userId } = useParams();

  const user = { userId: 1234 };

  return <>{userId ? <VideoViewer /> : <ObjectDetector user={user} />}</>;
};

export default StudyVideoContainer;
