import React, { useCallback } from 'react';
import { StyledList } from '../common/List';
import AchievementListItem from './AchievementListItem';
import achievementData from './achievement_list.json';

const AchievementList = ({ achievements }) => {
  const achievementList = achievementData.normal;
  const rowHeight = ({ index }) => 114.4;
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const achievementItem = achievementList[index]; // 도전과제
      const achievement = achievements
        ? achievements.filter(
            (achievement) => achievement.id === achievementItem.id,
          )[0] // 도전과제 id === 완수한 id
        : null;

      return (
        <AchievementListItem
          achievementItem={achievementItem}
          achievement={achievement}
          key={key}
          style={style}
        />
      );
    },
    [achievementList, achievements],
  );

  return (
    <StyledList
      className="AchievementList"
      width={617}
      height={815}
      rowCount={achievementList.length}
      rowHeight={rowHeight}
      rowRenderer={rowRenderer}
      list={achievementList}
      style={{ outline: 'none', height: '88vh' }}
      overscanRowCount={10}
      scrollToAlignment="start"
      scrollToIndex={0}
    />
  );
};

export default React.memo(AchievementList);
