/**
 * 메인 페이지 컨테이너
 *
 * 로그인한 사용자의 정보를 받아와서 type에 따라 다음을 출력한다
 * 부모 => 자식 리스트
 * 멘토 => 멘티 리스트
 * 멘티 => 캐릭터 + 학습버튼
 */

import React, { useEffect } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import ChildrenList from '../../components/main/ChildrenList';
import MenteeList from '../../components/main/MenteeList';
import UserInfo from '../../components/main/UserInfo';
import BottomTabBar from '../../components/common/BottomTabBar';
import { StudyButton } from '../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../modules/userInfo';
import Character from '../../components/main/Character';

const MainContainer = () => {
  const dispatch = useDispatch();
  let { info, error, loading, user } = useSelector(
    ({ userInfo, loading, user }) => ({
      info: userInfo.info,
      error: userInfo.error,
      loading: loading['userInfo/GET_USER_INFO'],
      user: user.user,
    }),
  );

  //* 테스트 info *//
  //* parent/mento/mentee 테스트 후 제거 필요 *//
  info = { type: 'mentee' };

  useEffect(() => {
    if (user !== null) dispatch(getUserInfo());
  }, [dispatch, user]);

  return (
    <ContentsBlock>
      {!error && <UserInfo info={info} />}
      {info ? (
        info.type === 'parent' ? (
          <ChildrenList />
        ) : info.type === 'mento' ? (
          <MenteeList />
        ) : info.type === 'mentee' ? (
          <>
            <Character />
            <StudyButton />
          </>
        ) : (
          <>사용자 정보를 불러오지 못했습니다.</>
        )
      ) : loading ? (
        <>로딩중입니다...</>
      ) : (
        <>사용자 정보를 불러오지 못했습니다.</>
      )}
      <BottomTabBar />
    </ContentsBlock>
  );
};

export default MainContainer;
