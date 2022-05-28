import React, { useEffect } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import StudentInfo from '../../components/management/StudentInfo';
import StudyTime from '../../components/management/StudyTime';
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
  const { studentInfo, studyTime } = useSelector(({ management }) => ({
    studentInfo: management.info,
    studyTime: management.studyTime,
  }));

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
      <StudentInfo studentInfo={studentInfo} />
      <StudyTime
        studyTime={studyTime}
        acceptTime={acceptTime}
        userId={studentInfo?.mteId}
      />
    </ContentsBlock>
  );
};

export default StudyTimeContainer;
