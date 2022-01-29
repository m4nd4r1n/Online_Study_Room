import React from 'react';
import { ItemBlock, StyledBox } from '../common/Contents';
import { ListItem } from '../common/List';
import { AiFillTrophy } from 'react-icons/ai';
import styled, { css } from 'styled-components';

const AchievementText = styled.span`
  display: flex;
  text-align: center;

  ${(props) =>
    props.title &&
    css`
      font-weight: bold;
      margin-bottom: 2px;
    `}

  ${(props) =>
    props.small &&
    css`
      font-size: 0.8rem;
    `}

    ${(props) =>
    props.largeMargin &&
    css`
      margin-bottom: 8px;
    `}
    ${(props) =>
    props.center &&
    css`
      justify-content: center;
    `}
`;

const AchievementListItem = ({ achievementItem, achievement, style }) => {
  const { title, description, exp } = achievementItem;
  const { date } = achievement ? achievement : { date: null };
  const dateString = date
    ? date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
    : '미달성';
  return (
    <ItemBlock>
      <StyledBox>
        <ListItem index>
          <AiFillTrophy />
        </ListItem>
        <ListItem title column>
          <AchievementText title>{title}</AchievementText>
          <AchievementText small largeMargin>
            {description}
          </AchievementText>
          <AchievementText small>{exp}XP</AchievementText>
        </ListItem>
        <ListItem>
          <AchievementText small padding center>
            {dateString}
          </AchievementText>
        </ListItem>
      </StyledBox>
    </ItemBlock>
  );
};

export default React.memo(
  AchievementListItem,
  (prevProps, nextProps) => prevProps.achievement === nextProps.achievement,
);
