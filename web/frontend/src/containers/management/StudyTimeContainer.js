import React, { useEffect } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import StudentInfo from '../../components/management/StudentInfo';
import StudyTimeList from '../../components/management/StudyTimeList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudentInfo,
  getStudyTime,
  acceptStudyTime,
} from '../../modules/management';
import { useParams } from 'react-router-dom';

const StudyTimeContainer = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { studentInfo, studyTime, error, loading } = useSelector(
    ({ management, loading }) => ({
      studentInfo: management.info,
      studyTime: management.studyTime,
      error: management.error,
      loading: loading['management/ACCEPT_STUDY_TIME'],
    }),
  );

  // 테스트용 학생정보
  // 필드 추가 가능
  const testStudentInfo = {
    school: '광운고등학교',
    name: '김광운',
  };

  const testStudyTime = [
    {
      time: new Date(),
      image: new Blob(),
    },
    {
      time: new Date(),
      image: new Blob(),
    },
  ];

  // 멘티정보, 공부시간
  useEffect(() => {
    dispatch(getStudentInfo({ userId }));
    dispatch(getStudyTime({ userId }));
  }, [dispatch, userId]);

  const acceptTime = ({ time }) => {
    dispatch(acceptStudyTime({ userId, time }));
  };

  return (
    <ContentsBlock>
      <StudentInfo studentInfo={testStudentInfo} />
      <StudyTimeList studyTime={testStudyTime} acceptTime={acceptTime} />
    </ContentsBlock>
  );
};

export default StudyTimeContainer;
