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
import tw from 'tailwind-styled-components';

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

const GraphBox = tw(StyledBox)`
  text-[1.2rem]
  font-bold
  border
  rounded-sm
  flex
  w-full
  flex-col
  justify-center
  items-center
  mb-1
`;

const StudyTimeGraph = ({ weekStudyTime, dateStudyTime }) => {
  const pieData = [
    { value: dateStudyTime && dateStudyTime[0].value },
    {
      value:
        dateStudyTime &&
        dateStudyTime[1].value > dateStudyTime[0].value &&
        dateStudyTime[1].value - dateStudyTime[0].value,
    },
  ];

  let weekRealTime = 0;
  let weekPurposeTime = 0;
  for (const i in weekStudyTime) {
    weekRealTime += weekStudyTime[i]['실제 공부시간'];
    weekPurposeTime += weekStudyTime[i]['목표 공부시간'];
  }

  return (
    <div className="flex w-full sm:w-2/5">
      <div className="-mt-[10px] flex w-full flex-col p-[10px]">
        <GraphBox>
          {dateStudyTime ? (
            <>
              <ColoredText small color={palette.gray[6]}>
                목표 공부시간
              </ColoredText>
              <div>
                <ColoredText color={palette.DodgerBlue}>
                  {dateStudyTime && dateStudyTime[1].value}
                </ColoredText>
                <ColoredText color={palette.gray[6]}> 분</ColoredText>
              </div>
              <ColoredText small>실제 공부시간</ColoredText>
              <div>
                <ColoredText color={palette.Coral}>
                  {dateStudyTime && dateStudyTime[0].value}
                </ColoredText>
                <ColoredText> 분</ColoredText>
              </div>

              <PieChart width={180} height={180}>
                <Pie
                  data={pieData}
                  cx={90}
                  cy={90}
                  innerRadius={40}
                  outerRadius={70}
                  fill={palette.DodgerBlue}
                  dataKey="value"
                >
                  {dateStudyTime.map((entry, index) => (
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
                    (dateStudyTime[0].value * 100) /
                    dateStudyTime[1].value
                  ).toFixed(1)}
                </text>
              </PieChart>
            </>
          ) : (
            <div>일일 공부시간을 불러올 수 없습니다.</div>
          )}
        </GraphBox>
        <GraphBox>
          {weekStudyTime ? (
            <BarChart
              width={210}
              height={270}
              data={weekStudyTime}
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
          ) : (
            <div>주간 공부시간을 불러올 수 없습니다.</div>
          )}
        </GraphBox>
        {weekStudyTime ? (
          <GraphBox>
            <ColoredText small color={palette.gray[6]}>
              주간 목표 공부시간
            </ColoredText>
            <div>
              <ColoredText color={palette.DodgerBlue}>
                {weekRealTime}
              </ColoredText>
              <ColoredText color={palette.gray[6]}> 분</ColoredText>
            </div>
            <ColoredText small>주간 총 공부시간</ColoredText>
            <div>
              <ColoredText color={palette.Coral}>{weekPurposeTime}</ColoredText>
              <ColoredText> 분</ColoredText>
            </div>
          </GraphBox>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default StudyTimeGraph;
