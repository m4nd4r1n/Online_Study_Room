import React, { useCallback } from 'react';
import { StyledList } from '../common/List';
import MessengerListItem from './MessengerListItem';

const MessengerList = ({ messengers }) => {
  const rowHeight = ({ index }) => 93.2;
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const messenger = messengers[index];

      return (
        <MessengerListItem messenger={messenger} key={key} style={style} />
      );
    },
    [messengers],
  );

  return (
    <StyledList
      className="MessengerList"
      width={617}
      height={815}
      rowCount={messengers.length}
      rowHeight={rowHeight}
      rowRenderer={rowRenderer}
      list={messengers}
      style={{ outline: 'none', height: '88vh' }}
      overscanRowCount={10}
      scrollToAlignment="start"
      scrollToIndex={0}
    />
  );
};

export default React.memo(MessengerList);
