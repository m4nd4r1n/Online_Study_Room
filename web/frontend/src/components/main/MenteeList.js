import React from 'react';
import { ItemBlock, StyledBox } from '../common/Contents';
import { useNavigate } from 'react-router-dom';
import { Divider, ListItem } from '../common/List';
import { MdManageAccounts, MdMessage, MdEventNote } from 'react-icons/md';

const Mentee = ({ mentee, index }) => {
  const navigate = useNavigate();

  return (
    <ItemBlock>
      <StyledBox>
        <ListItem>{mentee[1]}</ListItem>
        <Divider />
        <ListItem>{mentee[0]}</ListItem>
        <Divider />
        <ListItem fullwidth>
          {/* 멘티 관리 */}
          <MdManageAccounts
            onClick={() => {
              navigate('/');
            }}
          />

          {/* 플래너 */}
          <MdEventNote
            onClick={() => {
              navigate('/');
            }}
          />

          {/* 메신저 */}
          <MdMessage
            onClick={() => {
              navigate('/');
            }}
          />
        </ListItem>
        <Divider />
        <ListItem>{mentee[2]}</ListItem>
      </StyledBox>
    </ItemBlock>
  );
};

const MenteeList = () => {
  const mentees = [
    ['서울중', '박서울', '학습중'],
    ['부산고', '김부산', '오프라인'],
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
