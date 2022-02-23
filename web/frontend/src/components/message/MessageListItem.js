import React from 'react';
import { StyledBox } from '../common/Contents';
import { ListItem, ListItemText } from '../common/List';
import Moment from 'react-moment';

const MessageListItem = ({ user, messageItem, dateLine }) => {
  const { name, message, messageTime } = messageItem;
  const isMyMessage = user.name === name ? true : false;

  return (
    <>
      {dateLine && <Moment date={messageTime} format="YYYY년 M월 D일"></Moment>}
      <StyledBox message right={isMyMessage}>
        <ListItem auto column message left={!isMyMessage} right={isMyMessage}>
          <ListItemText left>{message}</ListItemText>
          <ListItemText small right>
            <Moment date={messageTime} format="h:mm A" />
          </ListItemText>
        </ListItem>
      </StyledBox>
    </>
  );
};

export default React.memo(
  MessageListItem,
  (prevProps, nextProps) => prevProps.message === nextProps.message,
);
