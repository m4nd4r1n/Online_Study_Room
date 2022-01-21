import React from 'react';
import { ItemBlock, StyledBox } from '../common/Contents';
//import { useNavigate } from 'react-router-dom';
import { Divider, ListItem } from '../common/List';

const planColor = ['#7B68EE', '#F8F8FF', '#E6E6FA', '#6A5ACD'];

const Plan = ({ plan, index }) => {
  //const navigate = useNavigate();
  const color = planColor[index % 5];

  return (
    <ItemBlock>
      <StyledBox
        style={{
          backgroundColor: color,
          fontSize: '1.2rem',
          fontWeight: 'bold',
          borderRadius: '0px',
          height: '51px',
          border: 'none',
        }}
      >
        <ListItem auto>{plan.subject}</ListItem>
        <Divider />
      </StyledBox>
    </ItemBlock>
  );
};

const PlanList = ({ plans }) => {
  return (
    <div
      style={{ width: '40%', justifyContent: 'flex-start', height: '744px' }}
    >
      <ItemBlock>PLAN</ItemBlock>
      {plans.map((plan, index) => (
        <Plan plan={plan} index={index} key={index} />
      ))}
    </div>
  );
};

export default PlanList;
