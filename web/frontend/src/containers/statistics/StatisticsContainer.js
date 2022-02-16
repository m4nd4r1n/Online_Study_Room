import React, { useState } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import StudyTimeTable from '../../components/statistics/StudyTimeTable';
import StudyTimeGraph from '../../components/statistics/StudyTimeGraph';

import { ItemBlock } from '../../components/common/Contents';
import { StyledDatePicker } from '../../components/common/Date';

const StatisticsContainer = () => {
  const [date, setDate] = useState(new Date());

  const testStudyTime = [
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
  ];

  // 날짜 선택 이벤트 핸들러
  const handleDate = (date) => {
    setDate(date);
    // dispatch(
    //   changeField({
    //     key: 'date',
    //     value: date,
    //   }),
    // );
  };

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
        <StudyTimeTable
          studyTime={testStudyTime}
          date={date}
          handleDate={handleDate}
        />
        <StudyTimeGraph purposeTime={360} realTime={240} />
      </div>
    </ContentsBlock>
  );
};

export default StatisticsContainer;
