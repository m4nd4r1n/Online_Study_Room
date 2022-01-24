import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';
import Modal from 'react-modal';
//import Button from '../common/Button';

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)',
  },
  content: {
    width: '340px',
    height: '400px',
    position: 'absolute',
    top: '40%',
    left: ' 50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #eee',
    borderRadius: '15px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: `${palette.Wheat}`,
  },
};

const AttendanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;

const ModalTitle = styled.span`
  margin-bottom: 1rem;
`;

const RewardItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${palette.Ivory};
  border-radius: 4px solid;
  color: ${palette.gray[8]};
`;

const StyledDayPicker = styled(DayPicker)`
  margin-top: -1rem;
  font-size: 0.9rem;
`;

const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const WEEKDAYS_LONG = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const WEEKDAYS_SHORT = ['일', '월', '화', '수', '목', '금', '토'];

const ATTENDANCE_DATES = [
  new Date(),
  new Date(2022, 0, 15),
  new Date(2022, 0, 18),
]; // 출석 날짜

const Attendance = ({ handleClick, isOpen, next }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClick} // 사이드 클릭 시 닫기
      style={modalStyle}
      contentLabel="Attendance"
    >
      {/* 내부 컨텐츠 클릭 시 닫기 */}
      <AttendanceWrapper onClick={handleClick}>
        {next ? (
          <>
            <ModalTitle>오늘의 출석보상</ModalTitle>
            <RewardItem>
              <img src={'character/ring_rainbow.png'} alt="ring" />
              <span>무지개 반지</span>
            </RewardItem>
          </>
        ) : (
          <>
            <ModalTitle>이번 달 출석현황</ModalTitle>
            <StyledDayPicker
              locale="ko"
              months={MONTHS}
              weekdaysLong={WEEKDAYS_LONG}
              weekdaysShort={WEEKDAYS_SHORT}
              canChangeMonth={false}
              selectedDays={ATTENDANCE_DATES} // 출석 날짜 표시
              fixedWeeks={true}
            />
          </>
        )}
        {/* <Button onClick={handleClick}>확인</Button> */}
      </AttendanceWrapper>
    </Modal>
  );
};

export default Attendance;
