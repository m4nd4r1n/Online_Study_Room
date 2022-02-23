import React from 'react';
import { ItemBlock } from '../common/Contents';
import { Minutes } from '../common/Table';
import { StyledDatePicker } from '../common/Date';

const Planner = ({ plans, date, handleDate }) => {
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
        width: '60%',
      }}
    >
      <ItemBlock>
        <StyledDatePicker
          dateFormat="yyyy.MM.dd"
          locale="ko"
          selected={date} //new Date(today.setDate(today.getDate() + 1))
          onChange={handleDate}
          placeholderText=" 날짜 선택"
          fixedHeight
          withPortal
        />
      </ItemBlock>
      {hours.map((hour) => (
        <Minutes hour={hour} key={hour} plans={plans}></Minutes>
      ))}
    </div>
  );
};

export default Planner;
