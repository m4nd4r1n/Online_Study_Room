import React, { useEffect } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import StudentInfo from '../../components/management/StudentInfo';
import ManagementList from '../../components/management/ManagementList';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentInfo } from '../../modules/management';
import { useParams } from 'react-router-dom';

const ManagementContainer = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { studentInfo, menteeList } = useSelector(
    ({ management, userInfo }) => ({
      studentInfo: management.info,
      menteeList: userInfo.info?.menteeList,
    }),
  );

  const student = menteeList?.filter((data) => data?.id === userId);

  useEffect(() => {
    dispatch(getStudentInfo({ userId }));
  }, [dispatch, userId]);

  return (
    <ContentsBlock>
      <StudentInfo studentInfo={studentInfo} />
      <ManagementList state={student[0]?.state} />
    </ContentsBlock>
  );
};

export default ManagementContainer;
