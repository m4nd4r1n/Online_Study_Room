import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ObjectDetector from '../../components/study/ObjectDetector';
import VideoViewer from '../../components/study/VideoViewer';
import { useSelector } from 'react-redux';

const StudyVideoContainer = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  useEffect(() => {
    !user && navigate('/login');
  });

  return <>{userId ? <VideoViewer /> : <ObjectDetector user={user} />}</>;
};

export default StudyVideoContainer;
