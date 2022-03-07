import React from 'react';
import styled from 'styled-components';

const InfoBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 3rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid;
`;

const StudentInfo = ({ studentInfo }) => {
  return (
    <InfoBar>
      <div style={{ width: '20%' }}>{studentInfo.school}</div>
      <div style={{ width: '20%' }}>{studentInfo.name} 학생</div>
    </InfoBar>
  );
};

export default StudentInfo;
