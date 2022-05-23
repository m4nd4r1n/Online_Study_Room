/**
 * 학습 통계 컨테이너
 *
 *
 */

import React, { useState, useEffect } from 'react';
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
import SelectMentee from './../../components/planner/SelectMentee';
import { getUserInfo } from '../../modules/userInfo';

const StatisticsContainer = () => {
  const { userId } = useParams();
  const [menteeId, setMenteeId] = useState(userId);
  const [date, setDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(
    new Date(new Date(date).setDate(date.getDate() - date.getDay())),
  );
  const dispatch = useDispatch();
  const { weekStudyTime, dateStudyTime, timeTable, error, user, info } =
    useSelector(({ statistics, user, userInfo }) => ({
      weekStudyTime: statistics.weekStudyTime,
      dateStudyTime: statistics.dateStudyTime
        ? statistics.dateStudyTime.dateStudyTime
        : null,
      timeTable: statistics.dateStudyTime
        ? statistics.dateStudyTime.timeTable
        : null,
      error: statistics.error,
      user: user.user,
      info: userInfo.info,
    }));

  //const testUser = {id:1234, type:"mentee"}
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

  const handleChange = (e) => {
    setMenteeId(e.target.value);
  };

  // 날짜 선택 이벤트 핸들러
  const handleDate = (date) => {
    setDate(date);
  };

  // 멘토 계정이면서 menteeList 없을 시 userInfo 요청
  useEffect(() => {
    if (user?.role === '멘토' && !info?.menteeList) {
      dispatch(getUserInfo());
    }
  }, [user, info, dispatch]);

  // weekStart 변경 시 해당 주의 공부시간 불러오기
  // 주간 공부시간 언마운트 시 전체 데이터 언로드
  useEffect(() => {
    dispatch(
      getWeekStudyTime({
        userId: menteeId ? menteeId : user?.id,
        year: weekStart.getFullYear(),
        month: weekStart.getMonth() + 1,
        day: weekStart.getDate(),
      }),
    );
    return () => {
      dispatch(unloadStatistics());
    };
  }, [dispatch, menteeId, weekStart, user]);

  // date 변경 시 date의 공부시간 불러오기
  useEffect(() => {
    dispatch(
      getDateStudyTime({
        userId: menteeId ? menteeId : user?.id,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      }),
    );
  }, [dispatch, menteeId, date, user]);

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
      {user?.role !== '멘티' && (
        <SelectMentee
          menteeList={info?.menteeList}
          menteeId={menteeId}
          handleChange={handleChange}
        />
      )}
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
      <div className="flex w-full flex-col sm:flex-row">
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
