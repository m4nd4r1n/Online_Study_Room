import React from 'react';
import { StyledBox } from '../common/Contents';
import { ListItem, ListItemText } from '../common/List';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { isToday } from '../common/Date';

const MessengerListItem = ({ messenger }) => {
  const { messengerId, messengerTitle, lastMessage, lastReceivedTime } =
    messenger;
  const navigate = useNavigate();

  return (
    <>
      <StyledBox
        messenger
        onClick={() => {
          navigate(`/messenger/${messengerId}`);
        }}
      >
        <ListItem title="true" column>
          <ListItemText title="true" left>
            {messengerTitle}
          </ListItemText>
          <ListItemText small largeMargin left>
            {lastMessage}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText small padding center>
            {isToday(new Date(lastReceivedTime.getTime())) ? (
              <Moment date={lastReceivedTime} format="h:mm A" />
            ) : (
              <Moment date={lastReceivedTime} format="YYYY.MM.DD" />
            )}
          </ListItemText>
        </ListItem>
      </StyledBox>
    </>
  );
};

export default React.memo(
  MessengerListItem,
  (prevProps, nextProps) => prevProps.messenger === nextProps.messenger,
);
