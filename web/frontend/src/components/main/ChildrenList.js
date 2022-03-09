import React from 'react';
import { ItemBlock, StyledBox } from '../common/Contents';
import { useNavigate } from 'react-router-dom';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import { Divider, ListItem } from '../common/List';

const Child = ({ child }) => {
  const navigate = useNavigate();

  return (
    <ItemBlock>
      <StyledBox $border>
        <ListItem>{child[1]}</ListItem>
        <Divider />
        <ListItem>{child[0]}</ListItem>
        <Divider />
        <ListItem fullwidth>
          {/* 학습 현황 */}
          <BsFillCameraVideoFill
            onClick={() => {
              navigate('/');
            }}
          />

          {/* 학습보고서 */}
          <IoDocumentText
            onClick={() => {
              navigate('/');
            }}
          />
        </ListItem>
        <Divider />
        <ListItem>{child[2]}</ListItem>
      </StyledBox>
    </ItemBlock>
  );
};

const ChildrenList = () => {
  const children = [
    ['서울중', '박서울', '학습중'],
    ['부산고', '김부산', '오프라인'],
  ];

  return (
    <>
      {children.map((child) => (
        <Child child={child} />
      ))}
    </>
  );
};

export default ChildrenList;
