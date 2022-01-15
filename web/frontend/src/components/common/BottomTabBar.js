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

/* 네비바 하단 고정 및 세로 길이 설정 */
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
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
  flex-direction: column;
  background-color: #ffffff;
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
          navigate('/achievement');
        }}
      >
        <AiFillTrophy />
        <span>도전과제</span>
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/ranking');
        }}
      >
        <MdOutlineEqualizer />
        <span>랭킹</span>
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/timer');
        }}
      >
        <MdTimer />
        <span>타이머</span>
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/planner');
        }}
      >
        <MdEventNote />
        <span>플래너</span>
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/messenger');
        }}
      >
        <MdMessage />
        <span>메시지</span>
      </ItemBox>
      <ItemBox
        onClick={() => {
          navigate('/setting');
        }}
      >
        <MdSettings />
        <span>설정</span>
      </ItemBox>
    </Wrapper>
  );
};

export default BottomTabBar;
