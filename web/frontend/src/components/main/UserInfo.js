import React from 'react';
import tw from 'tailwind-styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const ExpBar = tw(ProgressBar)`
  rounded
`;

const UserInfo = ({ info, type }) => {
  return (
    <InfoBar>
      <div className="w-[15%]">{info?.name} 님</div>
      {
        // 멘티(학생)에게만 레벨, 경험치를 보여줌
        type === 'mentee' && (
          <>
            <div className="w-[15%] text-right">Lv. {info?.level}</div>
            <div className="w-[15%] p-2 text-right">EXP</div>
            <div className="w-[65%] rounded border border-gray-500">
              <ExpBar
                isChild
                now={info?.exp}
                label={`${info?.exp}/120`}
                striped
                animated
                max={120}
              />
            </div>
          </>
        )
      }
    </InfoBar>
  );
};

export default UserInfo;
