import React from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import ChildrenList from '../../components/main/ChildrenList';
import MenteeList from '../../components/main/MenteeList';
import UserInfo from '../../components/main/UserInfo';
import BottomTabBar from '../../components/common/BottomTabBar';
import { StudyButton } from '../../components/common/Button';

const MainContainer = () => {
  return (
    <ContentsBlock>
      <UserInfo />
      <ChildrenList />
      <MenteeList />
      <StudyButton />
      <BottomTabBar />
    </ContentsBlock>
  );
};

export default MainContainer;
