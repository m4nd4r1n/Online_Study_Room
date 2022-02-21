/**
 * 메인 페이지 컨테이너
 *
 * 로그인한 사용자의 정보를 받아와서 type에 따라 다음을 출력
 * 부모 => 자식 리스트
 * 멘토 => 멘티 리스트
 * 멘티 => 캐릭터 + 학습버튼
 */

import React, { useEffect, useState } from 'react';
import { ContentsBlock } from '../../components/common/Contents';
import ChildrenList from '../../components/main/ChildrenList';
import MenteeList from '../../components/main/MenteeList';
import UserInfo from '../../components/main/UserInfo';
import { StudyButton } from '../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../modules/userInfo';
import Character from '../../components/main/Character';
import Attendance from '../../components/main/Attendance';

const MainContainer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [next, setNext] = useState(false);
  const dispatch = useDispatch();
  let { info, error, loading, user } = useSelector(
    ({ userInfo, loading, user }) => ({
      info: userInfo.info,
      error: userInfo.error,
      loading: loading['userInfo/GET_USER_INFO'],
      user: user.user,
    }),
  );

  // 테스트 info
  // parent/mento/mentee 테스트 후 제거 필요
  info = { type: 'mentee' };

  useEffect(() => {
    if (user !== null) dispatch(getUserInfo());
  }, [dispatch, user]);

  useEffect(() => {
    if (info.type !== 'mentee') setIsOpen(false);
  }, [info]);

  useEffect(() => {
    // 출석정보 가져오기 및 설정
  });

  // 첫 클릭 시 출석 ==> 보상
  // 두번째 클릭 시 창 닫기
  const handleClick = () => {
    if (!next) setNext(true);
    else setIsOpen(false);
  };

  return (
    <>
      <Attendance handleClick={handleClick} isOpen={isOpen} next={next} />
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
              <StudyButton to="/study" />
            </>
          ) : (
            <>사용자 정보를 불러오지 못했습니다.</>
          )
        ) : loading ? (
          <>로딩중입니다...</>
        ) : (
          <>사용자 정보를 불러오지 못했습니다.</>
        )}
      </ContentsBlock>
    </>
  );
};

export default MainContainer;
