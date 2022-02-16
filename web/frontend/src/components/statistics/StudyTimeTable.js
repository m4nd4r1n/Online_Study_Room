import React from 'react';
import palette from '../../lib/styles/palette';
import { TimeUnit } from '../common/Table';
import { Minutes } from '../common/Table';

const Tag = () => {
  const tags = [
    '시 간',
    '0-9',
    '10-19',
    '20-29',
    '30-39',
    '40-49',
    '50-59',
    '합 계',
  ];

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {tags.map((tag, index) => (
        <TimeUnit key={index} color={palette.Bisque}>
          {tag}
        </TimeUnit>
      ))}
    </div>
  );
};

const Sum = ({ sum }) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <TimeUnit style={{ width: '13%' }} color={palette.Moccasin}>
        합 계
      </TimeUnit>
      <TimeUnit fullWidth color={palette.Moccasin}>
        {sum}분
      </TimeUnit>
    </div>
  );
};

const StudyTimeTable = ({ studyTime }) => {
  const hours = [
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
  ];

  return (
    <div
      style={{
        display: 'flex',
        width: '60%',
        flexDirection: 'column',
      }}
    >
      <Tag />
      {hours.map((hour) => (
        <Minutes hour={hour} key={hour} studyTime={studyTime}></Minutes>
      ))}
      <Sum sum={studyTime ? studyTime.length * 10 : 0} />
    </div>
  );
};

export default StudyTimeTable;
