import React, { useCallback } from 'react';
import { StyledList } from '../common/List';
import MessageListItem from './MessageListItem';
import { isSameDay } from '../common/Date';

const MessaqgeList = ({ user, messages }) => {
  const rowHeight = ({ index }) => {
    return index > 0 &&
      isSameDay(messages[index - 1].messageTime, messages[index].messageTime)
      ? 83.2
      : 102.2;
  };

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const message = messages[index];
      const dateLine =
        index > 0 &&
        isSameDay(messages[index - 1].messageTime, message.messageTime)
          ? false
          : true;

      return (
        <MessageListItem
          user={user} // 사용자의 메시지는 오른쪽에 표시
          messageItem={message}
          dateLine={dateLine} // 그날의 첫 메시지의 경우 해당 날짜 표시
          key={key}
          style={style}
        />
      );
    },
    [messages, user],
  );

  return (
    <StyledList
      className="MessaqgeList"
      width={600}
      height={815.75}
      rowCount={messages.length}
      rowHeight={rowHeight}
      rowRenderer={rowRenderer}
      list={messages}
      style={{ outline: 'none', height: '88vh' }}
      overscanRowCount={10}
      scrollToAlignment="start"
      scrollToIndex={messages.length}
    />
  );
};

export default React.memo(MessaqgeList);
