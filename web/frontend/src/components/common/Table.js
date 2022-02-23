import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

export const TimeUnit = styled.div`
  border: 1px solid ${palette.gray[4]};
  height: 31px;
  margin-bottom: -1px;
  margin-right: -1px;
  display: flex;
  width: 13%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};

  ${(props) =>
    props.fullWidth &&
    css`
      width: 88%;
    `};
`;

export const Minutes = ({ hour, plans, studyTime }) => {
  const COLORS = ['#7B68EE', '#F8F8FF', '#E6E6FA', '#6A5ACD'];
  const minutes = ['00', '10', '20', '30', '40', '50'];
  let time = 0;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
      }}
    >
      <TimeUnit color={!plans && palette.AliceBlue}>
        <span>{hour}시</span>
      </TimeUnit>
      {minutes.map((minute) => {
        let color;
        let text = 'X';
        // plans null check
        if (plans) {
          for (let i = 0; i < plans.length; i++) {
            if (
              parseInt(hour + minute) >= parseInt(plans[i].startTime) &&
              parseInt(hour + minute) < parseInt(plans[i].endTime)
            )
              color = COLORS[i];
          }
        }
        if (studyTime) {
          studyTime.map(
            (time) => (text = time.time === hour + minute ? 'O' : text),
          );
        }
        if (text === 'O') {
          time = time + 10;
        }
        return (
          <TimeUnit
            key={minute}
            color={!plans && text === 'X' ? palette.gray[1] : color}
          >
            {!plans && text}
          </TimeUnit>
        );
      })}
      {!plans && (
        <TimeUnit color={time === 0 ? palette.AliceBlue : palette.Moccasin}>
          {time}분
        </TimeUnit>
      )}
    </div>
  );
};
