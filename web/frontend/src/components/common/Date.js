import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

export const StyledDatePicker = styled(DatePicker)`
  height: 24px;
  width: auto;
  border: none;
  text-align: center;
  background-color: transparent;
`;

// 두 날짜가 같으면 true 반환
export const isSameDay = (target1, target2) => {
  return (
    target1.getFullYear() === target2.getFullYear() &&
    target1.getMonth() === target2.getMonth() &&
    target1.getDate() === target2.getDate()
  );
};

// 오늘 날짜와 같으면 true 반환
export const isToday = (target) => {
  const today = new Date();

  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
};
