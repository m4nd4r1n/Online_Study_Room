/**
 * 학습 통계 컨테이너
 *
 *
 */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWeekStudyTime,
  getDateStudyTime,
  unloadStatistics,
} from '../../modules/statistics';
import { ContentsBlock } from '../../components/common/Contents';
import StudyTimeTable from '../../components/statistics/StudyTimeTable';
import StudyTimeGraph from '../../components/statistics/StudyTimeGraph';
import { ItemBlock } from '../../components/common/Contents';
import { StyledDatePicker } from '../../components/common/Date';
import { useEffect } from 'react';

const StatisticsContainer = () => {
  const { userId } = useParams();

  const [date, setDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(
    new Date(new Date(date).setDate(date.getDate() - date.getDay())),
  );
  const dispatch = useDispatch();
  const { weekStudyTime, dateStudyTime, timeTable, error } = useSelector(
    ({ statistics, loading }) => ({
      weekStudyTime: statistics.weekStudyTime,
      dateStudyTime: statistics.dateStudyTime
        ? statistics.dateStudyTime.dateStudyTime
        : null,
      timeTable: statistics.dateStudyTime
        ? statistics.dateStudyTime.timeTable
        : null,
      error: statistics.error,
    }),
  );

  const testWeekStudyTime = [
    {
      name: '일',
      '실제 공부시간': 130,
      '목표 공부시간': 150,
    },
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
  ];
  const testDateStudyTime = [
    { name: '실제 공부시간', value: 130 },
    { name: '목표 공부시간', value: 150 },
  ];
  const testTimeTable = [
    {
      date: date,
      time: '1030',
    },
    {
      date: date,
      time: '1040',
    },
    {
      date: date,
      time: '1050',
    },
    {
      date: date,
      time: '1100',
    },
    {
      date: date,
      time: '1110',
    },
    {
      date: date,
      time: '1120',
    },
    {
      date: date,
      time: '1400',
    },
    {
      date: date,
      time: '1410',
    },
    {
      date: date,
      time: '1420',
    },
    {
      date: date,
      time: '1430',
    },
    {
      date: date,
      time: '1440',
    },
    {
      date: date,
      time: '1450',
    },
    {
      date: date,
      time: '1500',
    },
  ];

  // 날짜 선택 이벤트 핸들러
  const handleDate = (date) => {
    setDate(date);
  };

  // weekStart 변경 시 해당 주의 공부시간 불러오기
  // 주간 공부시간 언마운트 시 전체 데이터 언로드
  useEffect(() => {
    dispatch(
      getWeekStudyTime({
        userId,
        month: weekStart.getMonth() + 1,
        day: weekStart.getDate(),
      }),
    );
    return () => {
      dispatch(unloadStatistics());
    };
  }, [dispatch, userId, weekStart]);

  // date 변경 시 date의 공부시간 불러오기
  useEffect(() => {
    dispatch(
      getDateStudyTime({
        userId,
        month: date.getMonth() + 1,
        day: date.getDate(),
      }),
    );
  }, [dispatch, userId, date]);

  // date 변경 시 weekStart 변경
  useEffect(() => {
    const newWeekStart = new Date(
      new Date(date).setDate(date.getDate() - date.getDay()),
    );
    if (newWeekStart.getTime() !== weekStart.getTime())
      setWeekStart(newWeekStart);
  }, [date, weekStart]);

  return (
    <ContentsBlock
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <ItemBlock
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
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
      <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
        <StudyTimeTable studyTime={testTimeTable} />
        <StudyTimeGraph
          weekStudyTime={testWeekStudyTime}
          dateStudyTime={testDateStudyTime}
        />
      </div>
    </ContentsBlock>
  );
};

export default StatisticsContainer;
