/**
 * 메인 페이지
 *
 * 로그인한 사용자의 정보를 받아와서 type에 따라 다음을 출력
 * 부모 => 자식 리스트
 * 멘토 => 멘티 리스트
 * 멘티 => 캐릭터 + 학습버튼
 */

import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MainContainer from '../containers/main/MainContainer';

const HomePage = () => {
  return (
    <>
      <HeaderContainer title="Main" back={false} />
      <MainContainer />
    </>
  );
};

export default HomePage;
