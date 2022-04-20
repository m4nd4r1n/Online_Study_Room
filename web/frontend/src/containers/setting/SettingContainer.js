import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingList from '../../components/setting/SettingList';
import { useSelector } from 'react-redux';

const RankingContainer = () => {
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const signOut = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
    }
  };

  const list = [
    {
      title: '이용약관',
    },
    {
      title: '개인정보 처리방침',
    },
    {
      title: '프로그램 버전',
      version: '1.0',
    },
    {
      title: '회원탈퇴',
      onClick: signOut,
    },
  ];

  useEffect(() => {
    !user && navigate('/login');
  });

  return (
    <>
      <SettingList list={list} />
    </>
  );
};

export default RankingContainer;
