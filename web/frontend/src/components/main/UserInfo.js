import React from 'react';
import tw from 'tailwind-styled-components';

const InfoBar = tw.div`
  flex
  justify-between
  items-center
  text-center
  h-12
  mb-4
  border-b
  border-gray-500
`;

const printExp = (ExpRatio) => {
  const exp = '■';
  let ExpBar = '';
  for (let i = 0; i < ExpRatio * 19; i++) {
    ExpBar += exp;
  }
  return ExpBar;
};

const UserInfo = ({ info }) => {
  const user = ['mentee', '김겨울', '8', 60];

  return (
    <InfoBar>
      <div style={{ width: '15%' }}>{user[1]} 님</div>
      {
        // 멘티(학생)에게만 레벨, 경험치를 보여줌
        info.type === 'mentee' && (
          <>
            <div style={{ width: '15%' }}>Lv. {user[2]}</div>
            <div
              style={{ width: '15%', textAlign: 'right', padding: '0.5rem' }}
            >
              EXP
            </div>
            <div style={{ width: '40%', textAlign: 'left' }}>
              {printExp(user[3] / 120)}
            </div>
            <div style={{ width: '15%' }}>{user[3]}/120</div>
          </>
        )
      }
    </InfoBar>
  );
};

export default UserInfo;
