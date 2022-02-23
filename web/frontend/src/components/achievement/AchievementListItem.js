import React from 'react';
import { StyledBox } from '../common/Contents';
import { ListItem, ListItemText } from '../common/List';
import { AiFillTrophy } from 'react-icons/ai';

const AchievementListItem = ({ achievementItem, achievement, style }) => {
  const { title, description, exp } = achievementItem;
  const { date } = achievement ? achievement : { date: null };
  const dateString = date
    ? date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
    : '미달성';
  return (
    <StyledBox>
      <ListItem index>
        <AiFillTrophy />
      </ListItem>
      <ListItem title="true" column>
        <ListItemText title="true" left>
          {title}
        </ListItemText>
        <ListItemText small largeMargin left>
          {description}
        </ListItemText>
        <ListItemText small left>
          {exp}XP
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText small padding center>
          {dateString}
        </ListItemText>
      </ListItem>
    </StyledBox>
  );
};

export default React.memo(
  AchievementListItem,
  (prevProps, nextProps) => prevProps.achievement === nextProps.achievement,
);
