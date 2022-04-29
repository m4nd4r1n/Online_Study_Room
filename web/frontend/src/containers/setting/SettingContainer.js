import React from 'react';
import SettingList from '../../components/setting/SettingList';
import { useDispatch } from 'react-redux';
import { signout } from '../../lib/api/auth';
import { logout } from './../../modules/user';

const RankingContainer = () => {
  const dispatch = useDispatch();

  // 화원탈퇴
  const signOut = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        await signout();
        window.alert('회원탈퇴가 완료되었습니다.');
        dispatch(logout());
      } catch (e) {
        window.alert('회원탈퇴에 실패했습니다.\r다시 시도해주세요.');
        console.log(e);
      }
    }
  };

  // onClick으로 클릭시 동작함수 정의
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

  return (
    <>
      <SettingList list={list} />
    </>
  );
};

export default RankingContainer;
