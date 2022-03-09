import React, { useCallback } from 'react';
import { StyledBox } from '../common/Contents';
import { StyledList } from '../common/List';
import StudyTimeListItem from './StudyTimeListItem';
import { ListItem, ListItemText } from '../common/List';

const StudyTimeList = ({ studyTime, acceptTime }) => {
  const rowHeight = ({ index }) => 93.2;
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const studyTimeItem = studyTime[index];

      return (
        <StudyTimeListItem
          studyTimeItem={studyTimeItem}
          acceptTime={acceptTime}
          key={key}
          style={style}
        />
      );
    },
    [studyTime, acceptTime],
  );

  return (
    <>
      <StyledBox className="h-16 bg-slate-400">
        <ListItem quarter column>
          <ListItemText>미인식</ListItemText>
          <ListItemText>시점</ListItemText>
        </ListItem>
        <ListItem fullwidth>
          <ListItemText>캡쳐 화면</ListItemText>
        </ListItem>
        <ListItem quarter column>
          <ListItemText>학습시간</ListItemText>
          <ListItemText>인정</ListItemText>
        </ListItem>
      </StyledBox>
      <StyledList
        className="StudyTimeList"
        width={640}
        height={723}
        rowCount={studyTime.length}
        rowHeight={rowHeight}
        rowRenderer={rowRenderer}
        list={studyTime}
        style={{ outline: 'none', height: '78vh' }}
        overscanRowCount={10}
        scrollToAlignment="start"
        scrollToIndex={0}
      />
    </>
  );
};

export default React.memo(StudyTimeList);
