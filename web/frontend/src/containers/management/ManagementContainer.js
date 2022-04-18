import React, { useEffect } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import StudentInfo from '../../components/management/StudentInfo';
import ManagementList from '../../components/management/ManagementList';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentInfo } from '../../modules/management';
import { useParams, useNavigate } from 'react-router-dom';

const ManagementContainer = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { studentInfo, error, user } = useSelector(({ management, user }) => ({
    studentInfo: management.info,
    error: management.error,
    user: user.user,
  }));

  // 테스트용 학생정보
  // 필드 추가 가능
  const testStudentInfo = {
    school: '광운고등학교',
    name: '김광운',
  };

  useEffect(() => {
    !user && navigate('/login');
  });

  useEffect(() => {
    dispatch(getStudentInfo({ userId }));
  }, [dispatch, userId]);

  return (
    <ContentsBlock>
      <StudentInfo studentInfo={testStudentInfo} />
      <ManagementList />
    </ContentsBlock>
  );
};

export default ManagementContainer;
