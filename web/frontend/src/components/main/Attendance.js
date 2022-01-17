import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';
import Modal from 'react-modal';
//import Button from '../common/Button';

registerLocale('ko', ko);

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

const StyledDatePicker = styled(DatePicker)`
  display: flex;
  margin-right: 1rem;
  margin-left: 1rem;
  height: 38px;
  width: auto;
  border-radius: 4px;
  border: 1px solid ${palette.gray[4]};
`;

const Attendance = ({ handleClick, isOpen, next }) => {
  const today = new Date();
  //const attendance = [today];

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
            <StyledDatePicker
              dateFormat="yyyy/MM/dd"
              disabled={true}
              locale="ko"
              selected={today} //new Date(today.setDate(today.getDate() + 1))
              //onChange={handleDate}
              //minDate={new Date(today.setDate(today.getDate() + 1))} // 과거 날짜 disable
              fixedHeight
              withPortal
              inline
            />
          </>
        )}
        {/* <Button onClick={handleClick}>확인</Button> */}
      </AttendanceWrapper>
    </Modal>
  );
};

export default Attendance;
