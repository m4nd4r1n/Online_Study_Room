import React from 'react';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import { cls } from '../../lib/utils';

const StyledDayPicker = styled(DayPicker)`
  margin-top: -1.875rem;
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

export function ModalCalendar({ dates, fixedWeeks, canChangeMonth }) {
  return (
    <StyledDayPicker
      months={MONTHS}
      weekdaysLong={WEEKDAYS_LONG}
      weekdaysShort={WEEKDAYS_SHORT}
      canChangeMonth={canChangeMonth}
      selectedDays={dates} // 출석 날짜 표시
      fixedWeeks={fixedWeeks}
    />
  );
}

const Overlay = ({ classNames, selectedDay, children, ...props }) => {
  return (
    <>
      <div className="fixed top-0 left-0 m-0 h-full w-full overflow-hidden bg-slate-400 bg-opacity-50 p-0" />
      <div className={cls(classNames.overlayWrapper, '-ml-32')} {...props}>
        <div className={cls(classNames.overlay, 'rounded-md')}>{children}</div>
      </div>
    </>
  );
};

export function SelectCalendar({ date, handleChange }) {
  return (
    <DayPickerInput
      format={'YYYY.MM.DD (ddd)'}
      formatDate={formatDate}
      parseDate={parseDate}
      onDayChange={handleChange}
      placeholder={date}
      dayPickerProps={{
        months: MONTHS,
        weekdaysLong: WEEKDAYS_LONG,
        weekdaysShort: WEEKDAYS_SHORT,
        todayButton: 'Go to Today',
        showOutsideDays: true,
      }}
      component={(props) => (
        <input
          className="cursor-pointer rounded-md border border-gray-300 text-center transition-colors placeholder:text-center placeholder:text-gray-700 focus:border focus:border-cyan-500 focus:outline-none"
          readOnly
          {...props}
        />
      )}
      overlayComponent={Overlay}
    />
  );
}
