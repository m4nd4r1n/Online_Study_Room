import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { ItemBlock } from '../common/Contents';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

const StyledDatePicker = styled(DatePicker)`
  height: 24px;
  width: auto;
  border: none;
  text-align: center;
  background-color: transparent;
`;

const planColor = ['#7B68EE', '#F8F8FF', '#E6E6FA', '#6A5ACD'];

const TimeUnit = styled.div`
  border: 1px solid ${palette.gray[4]};
  width: 16.5%;
  height: 31px;
  margin-bottom: -1px;
  margin-right: -1px;

  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

const HourOfPlan = ({ plans, hour }) => {
  const minutes = ['00', '10', '20', '30', '40', '50'];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TimeUnit>
        <span>{hour}시</span>
      </TimeUnit>
      {minutes.map((minute) => {
        let color = '#ffffff';
        // plans null check
        if (plans) {
          for (let i = 0; i < plans.length; i++) {
            if (
              parseInt(hour + minute) >= parseInt(plans[i].startTime) &&
              parseInt(hour + minute) < parseInt(plans[i].endTime)
            )
              color = planColor[i];
          }
        }
        return <TimeUnit key={minute} color={color}></TimeUnit>;
      })}
    </div>
  );
};

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
        height: '744px',
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
        <HourOfPlan hour={hour} key={hour} plans={plans}></HourOfPlan>
      ))}
    </div>
  );
};

export default Planner;
