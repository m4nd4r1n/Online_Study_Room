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
  text-xs
  sm:text-sm
  rounded
`;

const UserInfo = ({ info, type, setIsOpen }) => {
  return (
    <InfoBar>
      <span className="w-2/12">{info?.name} 님</span>
      {
        // 멘티(학생)에게만 레벨, 경험치를 보여줌
        type === 'mentee' && (
          <>
            <span className="w-2/12 sm:w-1/12">Lv. {info?.level}</span>
            <span className="w-1/12 pr-1 text-right">EXP</span>
            <div className="mr-2 w-6/12 rounded border border-gray-500">
              <ExpBar
                isChild
                now={info?.exp}
                label={`${info?.exp}/120`}
                striped
                animated
                max={120}
              />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="w-2/12 rounded border px-1 text-xs text-gray-600 sm:text-sm"
            >
              출석 현황 확인
            </button>
          </>
        )
      }
    </InfoBar>
  );
};

export default UserInfo;
