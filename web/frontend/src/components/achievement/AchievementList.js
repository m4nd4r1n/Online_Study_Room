import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import AchievementListItem from './AchievementListItem';
import achievementData from './achievement_list.json';

const AchievementList = ({ achievements }) => {
  const achievementList = achievementData.normal;

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
    <List
      className="AchievementList"
      width={617}
      height={815}
      rowCount={achievementList.length}
      rowHeight={114.4}
      rowRenderer={rowRenderer}
      list={achievementList}
      style={{ outline: 'none', height: '88vh' }}
    />
  );
};

export default React.memo(AchievementList);
