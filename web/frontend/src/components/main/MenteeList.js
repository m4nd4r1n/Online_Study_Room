import React from 'react';
import { ItemBlock, StyledBox } from '../common/Contents';
import { useNavigate } from 'react-router-dom';
import { Divider, ListItem } from '../common/List';
import { MdManageAccounts, MdMessage, MdEventNote } from 'react-icons/md';

const Mentee = ({ mentee, index }) => {
  const navigate = useNavigate();

  return (
    <ItemBlock>
      <StyledBox $border>
        <ListItem>{mentee.name}</ListItem>
        <Divider />
        <ListItem>{mentee.school}</ListItem>
        <Divider />
        <ListItem fullwidth>
          {/* 멘티 관리 */}
          <MdManageAccounts
            onClick={() => {
              navigate(`/management/${mentee.id}`);
            }}
          />

          {/* 플래너 */}
          <MdEventNote
            onClick={() => {
              navigate(`/planner/${mentee.id}`);
            }}
          />

          {/* 메신저 */}
          <MdMessage
            onClick={() => {
              navigate(`/messenger/${mentee.messengerId}`);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem>{mentee.state}</ListItem>
      </StyledBox>
    </ItemBlock>
  );
};

const MenteeList = () => {
  const mentees = [
    {
      id: '1234',
      school: '서울중',
      name: '박서울',
      state: '학습중',
      messengerId: 'messengerId1',
    },
    {
      id: '5678',
      school: '부산고',
      name: '김부산',
      state: '오프라인',
      messengerId: 'messengerId2',
    },
  ];

  return (
    <>
      {mentees.map((mentee, index) => (
        <Mentee mentee={mentee} index={index} />
      ))}
    </>
  );
};

export default MenteeList;
