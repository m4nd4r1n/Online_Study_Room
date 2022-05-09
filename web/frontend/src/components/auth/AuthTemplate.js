import React from 'react';
import tw from 'tailwind-styled-components';

/**
 * 회원가입 / 로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
 */

/* 화면 전체를 채움 */
const AuthTemplateBlock = tw.div`
  absolute
  left-0
  top-14
  bottom-0
  right-0
  flex
  flex-col
  items-center
  bg-gray-200
`;
//bg-gray-200
/* 흰색 박스 */
const WhiteBox = tw.div`
  w-[360px]
  rounded-sm
  bg-white
  p-8
  shadow-md
  backdrop-blur-sm
  z-50
`;

const AuthTemplate = ({ children, center }) => {
  return (
    <AuthTemplateBlock
      style={
        center
          ? {
              justifyContent: 'center',
            }
          : {}
      }
    >
      <WhiteBox
        style={
          !center
            ? {
                marginTop: '4px',
              }
            : {}
        }
      >
        {children}
      </WhiteBox>
      <div className="absolute left-0 right-0 flex h-60 bg-[url('../public/background/kwu.jpg')] opacity-60 blur-sm"></div>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
