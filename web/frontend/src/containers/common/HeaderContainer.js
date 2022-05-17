import React from 'react';
import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './../../modules/user';

/**
 * @title : 헤더 타이틀
 * @back  : 뒤로가기 버튼 여부
 */
const HeaderContainer = ({ title, back, counter }) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const Logout = () => dispatch(logout());
  return (
    <Header
      title={title}
      back={back}
      counter={counter}
      isAdmin={user?.type === 'admin'}
      Logout={Logout}
    />
  );
};

export default HeaderContainer;
