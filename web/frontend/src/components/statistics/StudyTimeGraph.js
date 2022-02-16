import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { StyledBox } from '../common/Contents';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const weekData = [
  {
    name: '월',
    '실제 공부시간': 360,
    '목표 공부시간': 240,
  },
  {
    name: '화',
    '실제 공부시간': 100,
    '목표 공부시간': 300,
  },
  {
    name: '수',
    '실제 공부시간': 150,
    '목표 공부시간': 100,
  },
  {
    name: '목',
    '실제 공부시간': 300,
    '목표 공부시간': 300,
  },
  {
    name: '금',
    '실제 공부시간': 0,
    '목표 공부시간': 200,
  },
  {
    name: '토',
    '실제 공부시간': 100,
    '목표 공부시간': 100,
  },
  {
    name: '일',
    '실제 공부시간': 130,
    '목표 공부시간': 150,
  },
];

const dayData = [
  { name: '달성', value: 240 },
  { name: '미달성', value: 120 },
];

const COLORS = [palette.Coral, palette.DodgerBlue];

const ColoredText = styled.span`
  color: #000000;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `};

  ${(props) =>
    props.small &&
    css`
      font-size: 1rem;
    `}
`;

const GraphBox = styled(StyledBox)`
  background-color: ${(props) => props.color};
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 0px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & + & {
    margin-top: 1rem;
  }
`;

const StudyTimeGraph = ({ purposeTime, realTime }) => {
  let realTimeSum = 0;
  let purposeTimeSum = 0;

  for (const i in weekData) {
    realTimeSum += weekData[i]['실제 공부시간'];
    purposeTimeSum += weekData[i]['목표 공부시간'];
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '40%',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          padding: '10px',
          marginTop: '-10px',
        }}
      >
        <GraphBox>
          <ColoredText small color={palette.gray[6]}>
            목표 공부시간
          </ColoredText>
          <div>
            <ColoredText color={palette.DodgerBlue}>{purposeTime}</ColoredText>
            <ColoredText color={palette.gray[6]}> 분</ColoredText>
          </div>
          <ColoredText small>실제 공부시간</ColoredText>
          <div>
            <ColoredText color={palette.Coral}>{realTime}</ColoredText>
            <ColoredText> 분</ColoredText>
          </div>
          <PieChart width={180} height={180}>
            <Pie
              data={dayData}
              cx={90}
              cy={90}
              innerRadius={40}
              outerRadius={70}
              fill={palette.DodgerBlue}
              dataKey="value"
            >
              {dayData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x={95}
              y={78}
              dy={8}
              textAnchor="middle"
              style={{ fontSize: '0.7rem' }}
              fill={palette.gray[6]}
            >
              달성률(%)
            </text>
            <text
              x={95}
              y={100}
              dy={8}
              textAnchor="middle"
              style={{ fontSize: '1.4rem' }}
            >
              {(
                (dayData[0].value * 100) /
                (dayData[0].value + dayData[1].value)
              ).toFixed(1)}
            </text>
          </PieChart>
        </GraphBox>
        <GraphBox>
          <BarChart
            width={210}
            height={258}
            data={weekData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            style={{ fontSize: '0.8rem' }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="목표 공부시간" fill={COLORS[1]} />
            <Bar dataKey="실제 공부시간" fill={COLORS[0]} />
          </BarChart>
        </GraphBox>
        <GraphBox>
          <ColoredText small color={palette.gray[6]}>
            주간 목표 공부시간
          </ColoredText>
          <div>
            <ColoredText color={palette.DodgerBlue}>{realTimeSum}</ColoredText>
            <ColoredText color={palette.gray[6]}> 분</ColoredText>
          </div>
          <ColoredText small>주간 총 공부시간</ColoredText>
          <div>
            <ColoredText color={palette.Coral}>{purposeTimeSum}</ColoredText>
            <ColoredText> 분</ColoredText>
          </div>
        </GraphBox>
      </div>
    </div>
  );
};

export default StudyTimeGraph;
