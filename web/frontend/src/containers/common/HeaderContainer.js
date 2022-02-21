import React from 'react';
import Header from '../../components/common/Header';

/**
 * @title : 헤더 타이틀
 * @back  : 뒤로가기 버튼 여부
 */
const HeaderContainer = ({ title, back, counter }) => {
  return <Header title={title} back={back} counter={counter} />;
};

export default HeaderContainer;
