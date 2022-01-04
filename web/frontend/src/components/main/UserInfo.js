import React from 'react';
import styled from 'styled-components';

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 3rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid;
`;

const printExp = (ExpRatio) => {
  const exp = '■';
  let ExpBar = '';
  for (let i = 0; i < ExpRatio * 19; i++) {
    ExpBar += exp;
  }
  return ExpBar;
};

const UserInfo = () => {
  const user = ['mentee', '김겨울', '8', 60];

  return (
    <InfoBar>
      <div style={{ width: '15%' }}>{user[1]} 님</div>
      <div style={{ width: '15%' }}>Lv. {user[2]}</div>
      <div style={{ width: '15%', textAlign: 'right', padding: '0.5rem' }}>
        EXP
      </div>
      <div style={{ width: '40%', textAlign: 'left' }}>
        {printExp(user[3] / 120)}
      </div>
      <div style={{ width: '15%' }}>{user[3]}/120</div>
    </InfoBar>
  );
};

export default UserInfo;
