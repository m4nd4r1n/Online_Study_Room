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
      <span className="w-1/3 sm:w-1/5">{studentInfo.school}</span>
      <span className="w-1/3 sm:w-1/5">{studentInfo.name} 학생</span>
    </InfoBar>
  );
};

export default StudentInfo;
