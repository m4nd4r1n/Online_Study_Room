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
import { getAttendance } from '../../modules/attendanceInfo';
import { useNavigate } from 'react-router-dom';

const MainContainer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { info, loading, user, dates } = useSelector(
    ({ userInfo, loading, user, attendanceInfo }) => ({
      info: userInfo.info,
      loading: loading['userInfo/GET_USER_INFO'],
      user: user.user,
      dates: attendanceInfo.dates,
    }),
  );

  useEffect(() => {
    if (user !== null) {
      dispatch(getUserInfo());
      dispatch(getAttendance({ userID: user.userId })); //
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.role !== '멘티') setIsOpen(false);
  }, [user]);

  useEffect(() => {
    if (user?.role === '멘티') {
      try {
        if (localStorage.getItem('lastVisit')) {
          const lastVisit = new Date(localStorage.getItem('lastVisit'));
          const today = new Date();
          if (
            today.getFullYear() === lastVisit.getFullYear() &&
            today.getMonth() === lastVisit.getMonth() &&
            today.getDate() === lastVisit.getDate()
          ) {
            setIsOpen(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [user]);

  // 클릭 시 창 닫기
  const handleClick = () => {
    setIsOpen(false);
    localStorage.setItem('lastVisit', new Date());
  };

  return (
    <>
      <Attendance handleClick={handleClick} isOpen={isOpen} dates={dates} />
      <ContentsBlock>
        <UserInfo info={info} type={user?.role} setIsOpen={setIsOpen} />
        {user ? (
          user?.role === '학부모' ? (
            <ChildrenList />
          ) : user?.role === '멘토' ? (
            <MenteeList />
          ) : user?.role === '멘티' ? (
            <>
              <Character />
              <StudyButton
                onClick={() => {
                  window.alert(
                    '학습하는 모습이 잘 나오도록 카메라를 배치시켜주세요.\n핸드폰 등 학습에 불필요한 물건이 인식되지 않도록 주의해주세요.',
                  );
                  navigate('/study', { replace: true });
                }}
              />
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
