import React from 'react';
import BottomTabBar from '../../components/common/BottomTabBar';
import { useSelector } from 'react-redux';

const BottomTabBarContainer = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  return <BottomTabBar type={user?.role} />;
};

export default BottomTabBarContainer;
