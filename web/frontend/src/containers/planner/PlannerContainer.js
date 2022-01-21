import React from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import PlanList from '../../components/planner/PlanList';
import Planner from '../../components/planner/Planner';

const PlannerContainer = () => {
  const today = new Date();
  // 과목, 시간, 날짜
  const plans = [
    {
      subject: '리액트',
      plan: {
        startDate: today,
        endDate: today,
        startTime: '0900',
        endTime: '1000',
      },
    },
    {
      subject: '스프링',
      plan: {
        startDate: today,
        endDate: today,
        startTime: '1030',
        endTime: '1200',
      },
    },
    {
      subject: '파이썬',
      plan: {
        startDate: today,
        endDate: today,
        startTime: '1400',
        endTime: '1500',
      },
    },
  ];

  return (
    <ContentsBlock style={{ display: 'flex' }}>
      <PlanList plans={plans} />
      <Planner plans={plans} />
    </ContentsBlock>
  );
};

export default PlannerContainer;
