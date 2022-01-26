import React from 'react';
import { ItemBlock, StyledBox } from '../common/Contents';
import { ListItem } from '../common/List';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { BsPlus, BsX } from 'react-icons/bs';

const planColor = ['#7B68EE', '#F8F8FF', '#E6E6FA', '#6A5ACD'];

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const PlanBox = styled(StyledBox)`
  background-color: ${(props) => props.color};
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 0px;
  height: 51px;

  &:hover {
    box-shadow: 0px 0px 5px inset;
  }
`;

const Plan = ({ plan, index, onRemove }) => {
  const color = planColor[index % 5];

  return (
    <ItemBlock>
      <PlanBox color={color} item>
        <ListItem auto>{plan.subject}</ListItem>
        <IconWrapper
          onClick={() =>
            onRemove({
              subject: plan.subject,
              date: plan.date,
            })
          }
        >
          <BsX size="25px" />
        </IconWrapper>
      </PlanBox>
    </ItemBlock>
  );
};

const PlanList = ({ plans, onRemove, setIsAddPlan }) => {
  return (
    <div
      style={{ width: '40%', justifyContent: 'flex-start', height: '744px' }}
    >
      <ItemBlock>PLAN</ItemBlock>
      {plans ? (
        plans.map((plan, index) => (
          <Plan plan={plan} index={index} key={index} onRemove={onRemove} />
        ))
      ) : (
        <></>
      )}
      <PlanBox color={palette.gray[8]}>
        <ListItem auto style={{ color: '#ffffff' }}>
          플랜 추가
        </ListItem>
        <IconWrapper onClick={() => setIsAddPlan(true)}>
          <BsPlus size="25px" color="#ffffff" />
        </IconWrapper>
      </PlanBox>
    </div>
  );
};

export default PlanList;
