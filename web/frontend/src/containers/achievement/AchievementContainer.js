import React from 'react';
import AchievementList from '../../components/achievement/AchievementList';
import { ContentsBlock } from '../../components/common/Contents';

const AchievementContainer = () => {
  const achievements = [
    { id: 1, date: new Date() },
    { id: 2, date: new Date() },
    { id: 3, date: new Date() },
    { id: 6, date: new Date() },
    { id: 7, date: new Date() },
    { id: 8, date: new Date() },
    { id: 9, date: new Date() },
  ];

  return (
    <ContentsBlock>
      <AchievementList achievements={achievements} />
    </ContentsBlock>
  );
};

export default AchievementContainer;
