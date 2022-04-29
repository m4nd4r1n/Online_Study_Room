import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readAchievement } from '../../modules/achievement';
import { ContentsBlock } from '../../components/common/Contents';
import Achievement from '../../components/achievement/Achievement';

const AchievementContainer = () => {
  const dispatch = useDispatch();
  const { achievements } = useSelector(({ achievement }) => ({
    achievements: achievement.achievements,
  }));

  // const achievements = [
  //   { id: 1, date: new Date() },
  //   { id: 2, date: new Date() },
  //   { id: 3, date: new Date() },
  //   { id: 6, date: new Date() },
  //   { id: 7, date: new Date() },
  //   { id: 8, date: new Date() },
  //   { id: 9, date: new Date() },
  // ];

  useEffect(() => {
    dispatch(readAchievement());
  }, [dispatch]);

  return (
    <ContentsBlock>
      <Achievement achievements={achievements} />
    </ContentsBlock>
  );
};

export default AchievementContainer;
