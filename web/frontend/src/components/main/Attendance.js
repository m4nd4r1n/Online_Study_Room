import React from 'react';
import 'react-day-picker/lib/style.css';
import Modal from 'react-modal';
import { ModalCalendar } from '../common/Calendar';
import tw from 'tailwind-styled-components';

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
    backgroundColor: '#ECFEFF',
  },
};

const AttendanceWrapper = tw.div`
  flex
  flex-col
  justify-center
  text-center
  text-[1.5rem]
  font-bold
`;

tw.div`bg-cyan-50`;

const ModalTitle = tw.span`
  mb-8
  border-b
  border-gray-300
`;

const Attendance = ({ handleClick, isOpen, dates }) => {
  const attendanceDates = dates?.map((date) => new Date(date));
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClick} // 사이드 클릭 시 닫기
      style={modalStyle}
      contentLabel="Attendance"
    >
      {/* 내부 컨텐츠 클릭 시 닫기 */}
      <AttendanceWrapper onClick={handleClick}>
        <ModalTitle>이번 달 출석현황</ModalTitle>
        <ModalCalendar
          dates={attendanceDates}
          canChangeMonth={false}
          fixedWeeks
        />
      </AttendanceWrapper>
    </Modal>
  );
};

export default Attendance;
