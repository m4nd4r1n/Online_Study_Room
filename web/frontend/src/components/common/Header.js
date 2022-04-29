import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import Counter from './Counter';
import tw from 'tailwind-styled-components';

const HeaderBlock = tw.div`
  fixed
  w-full
  bg-white
  shadow-md
`;

const ItemContainer = tw.div`
  w-1/3
`;

/**
 * 타이틀 글자 설정
 */
const Title = tw.div`
  text-xl
  sm:text-2xl
  w-1/3
  flex
  justify-center
`;

/**
 * 밑줄 제거, 글자색 설정된 Link
 */
const StyledLink = tw(Link)`
  no-underline
  items-center
  justify-center
  text-inherit
  hover:text-gray-600
  text-lg
  font-extrabold
  tracking-[2px]
`;

/**
 * 밑줄 없는 redirect 버튼
 */
const HeaderButton = tw(Button)`
  no-underline
  border-0
  text-inherit
  hover:text-gray-700
  hover:border-0
  focus:ring-0
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrap = styled.div`
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
const Wrapper = tw(Wrap)`
  h-14
  flex
  items-center
  justify-between
  w-11/12
  pl-4
  pr-4
  mx-auto
`;

const Header = ({ title, back, counter }) => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <ItemContainer>
            {back && (
              <HeaderButton white="true" onClick={() => navigate(-1)}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </HeaderButton>
            )}
            {counter && <Counter />}
          </ItemContainer>

          <Title>{title}</Title>

          <ItemContainer className="right">
            <StyledLink to="/">
              <div className="text-xs sm:text-base">open SKY</div>
            </StyledLink>
          </ItemContainer>
        </Wrapper>
      </HeaderBlock>
      <div className="h-14" />
    </>
  );
};

export default Header;
