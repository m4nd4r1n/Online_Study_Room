import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { ItemBlock } from '../common/Contents';

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

const HourOfPlan = ({ plans, hour, index }) => {
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
        for (let i = 0; i < plans.length; i++) {
          if (
            parseInt(hour + minute) >= parseInt(plans[i].plan.startTime) &&
            parseInt(hour + minute) < parseInt(plans[i].plan.endTime)
          )
            color = planColor[i];
        }
        return <TimeUnit key={minute} color={color}></TimeUnit>;
      })}
    </div>
  );
};

const Planner = ({ plans }) => {
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

  const date = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = week[now.getDay()];
    return year + '.' + month + '.' + date + ' ' + dayOfWeek;
  };

  return (
    <div
      style={{
        width: '60%',
        height: '744px',
      }}
    >
      <ItemBlock>{date()}</ItemBlock>
      {hours.map((hour, index) => (
        <HourOfPlan
          hour={hour}
          key={hour}
          plans={plans}
          index={index}
        ></HourOfPlan>
      ))}
    </div>
  );
};

export default Planner;
