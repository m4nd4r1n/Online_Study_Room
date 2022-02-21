import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import palette from '../../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import Counter from './Counter';

const HeaderBlock = styled.div`
  position: absolute;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const ItemContainer = styled.div`
  width: 33%;
`;

/**
 * 타이틀 글자 설정
 */
const Title = styled.div`
  font-size: 2rem;
  width: 33%;
  display: flex;
  justify-content: center;
`;

/**
 * 밑줄 제거, 글자색 설정된 Link
 */
const StyledLink = styled(Link)`
  text-decoration: none;
  align-items: center;
  justify-content: center;
  color: inherit;
  &:hover {
    color: ${palette.gray[7]};
  }
`;

/**
 * 밑줄 없는 redirect 버튼
 */
const HeaderButton = styled(Button)`
  text-decoration: none;
  border: 1px solid ${palette.gray[8]};
  background-color: #ffffff;
  color: inherit;
  &:hover {
    color: ${palette.gray[8]};
    border: 1px solid ${palette.gray[5]};
    background-color: #ffffff;
  }
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const Header = ({ title, back, counter }) => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <ItemContainer>
            {back && (
              <HeaderButton onClick={() => navigate(-1)}>←</HeaderButton>
            )}
            {counter && <Counter />}
          </ItemContainer>

          <Title>{title}</Title>

          <ItemContainer className="right">
            <StyledLink to="/" className="logo">
              <div style={{ fontSize: '1rem' }}>open SKY</div>
            </StyledLink>
          </ItemContainer>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
