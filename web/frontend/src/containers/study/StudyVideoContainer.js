import React from 'react';
import { useParams } from 'react-router-dom';
import ObjectDetector from '../../components/study/ObjectDetector';
import VideoViewer from '../../components/study/VideoViewer';
import { useSelector } from 'react-redux';

const StudyVideoContainer = () => {
  const { userId } = useParams();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  return <>{userId ? <VideoViewer /> : <ObjectDetector user={user} />}</>;
};

export default StudyVideoContainer;
