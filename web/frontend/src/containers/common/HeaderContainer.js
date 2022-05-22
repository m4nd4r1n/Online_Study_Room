import React from 'react';
import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './../../modules/user';

/**
 * @title : 헤더 타이틀
 * @back  : 뒤로가기 버튼 여부
 */
const HeaderContainer = ({ title, back, counter, logo }) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const Logout = () => dispatch(logout());
  return (
    <Header
      title={title}
      back={back}
      counter={counter}
      isAdmin={user?.role === '관리자'}
      Logout={Logout}
      logo={logo}
    />
  );
};

export default HeaderContainer;
