import React from 'react';
import tw from 'tailwind-styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

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

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: '1rem',
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#E5E7EB',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const UserInfo = ({ info, type, setIsOpen }) => {
  return (
    <InfoBar>
      <span className="w-2/12">{info?.name} 님</span>
      {
        // 멘티(학생)에게만 레벨, 경험치를 보여줌
        type === '멘티' && (
          <>
            <span className="w-2/12 sm:w-1/12">Lv. {info?.level}</span>
            <span className="w-1/12 pr-1 text-right">EXP</span>
            <div className="mr-2 w-6/12 rounded bg-gray-200">
              <BorderLinearProgress
                variant="determinate"
                value={(info?.exp / 120) * 100}
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
