import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import { AiFillTrophy } from 'react-icons/ai';
import { MdOutlineEqualizer } from 'react-icons/md';
import { MdTimer } from 'react-icons/md';
import { MdEventNote } from 'react-icons/md';
import { MdMessage } from 'react-icons/md';
import { MdSettings } from 'react-icons/md';

/* 네비바 하단 고정 밑 세로 길이 설정 */
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  overflow: hidden;
  border-top: 2px solid grey;
  display: flex;
  justify-content: space-around;
`;

/* 아이콘 컨테이너 */
const ItemBox = styled.div`
  width: 17%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${palette.LightGreen};
  }
`;

const BottomTabBar = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ItemBox
        onClick={() => {
          navigate('/login');
        }}
      >
        <AiFillTrophy />
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/login');
        }}
      >
        <MdOutlineEqualizer />
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/login');
        }}
      >
        <MdTimer />
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/login');
        }}
      >
        <MdEventNote />
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/login');
        }}
      >
        <MdMessage />
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/login');
        }}
      >
        <MdSettings />
      </ItemBox>
    </Wrapper>
  );
};

export default BottomTabBar;
