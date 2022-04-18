import React from 'react';
import { Text } from 'react-native';
import { ContentsBlock } from '../../components/common/Contents';
import { useRoute } from '@react-navigation/native';
import StudentInfo from '../../components/home/StudentInfo';
import ManagementList from '../../components/home/ManagementList';

const Management = () => {
  const {
    params: { id },
  } = useRoute();

  const testStudentInfo = {
    school: '광운고등학교',
    name: '김광운',
  };

  return (
    <ContentsBlock center={false}>
      <StudentInfo studentInfo={testStudentInfo} />
      <ManagementList />
    </ContentsBlock>
  );
};

export default Management;
