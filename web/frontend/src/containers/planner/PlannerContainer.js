/**
 * 플래너 컨테이너
 *
 * 해당 날짜의 플랜 리스트 및 플래너 출력
 * 플랜 정보를 입력해서 추가
 *
 * 백서버 연동 후 copyPlan 제거 필요
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readPlanner, unloadPlanner } from '../../modules/planner';
import { changeField, initializePlan, addPlan } from '../../modules/plan';
import { ContentsBlock } from '../../components/common/Contents';
import AddPlan from '../../components/planner/AddPlan';
import { removePlan } from '../../lib/api/planner';
import Planner from '../../components/planner/Planner';
import { formatDate } from 'react-day-picker/moment';

const PlannerContainer = () => {
  const { userId } = useParams();

  const [date, setDate] = useState(
    `${formatDate(new Date(), 'YYYY.MM.DD (ddd)')}`,
  );
  const [crossBrowserDate, setCrossBrowserDate] = useState(
    `${formatDate(new Date(), 'YYYY-MM-DD')}`,
  );
  const [isAddPlan, setIsAddPlan] = useState(false);
  const [addError, setAddError] = useState(null);
  const dispatch = useDispatch();
  const { plans, plan, planLoading, user } = useSelector(
    ({ planner, plan, loading, user }) => ({
      plans: planner.plans,
      plan: plan.plan,
      planLoading: loading['plan/ADD_PLAN'],
      user: user.user,
    }),
  );

  // 날짜 변경 시 새 플래너 요청, 플랜 날짜 변경
  useEffect(() => {
    const formattedDate = new Date(crossBrowserDate);
    dispatch(
      readPlanner({
        month: formattedDate.getMonth() + 1,
        day: formattedDate.getDate(),
        userId: userId ? userId : user && user.userId,
      }),
    );
    dispatch(
      changeField({
        key: 'date',
        value: formattedDate,
      }),
    );
    return () => {
      dispatch(unloadPlanner());
    };
  }, [dispatch, crossBrowserDate, userId, user]);

  useEffect(() => {
    if (!isAddPlan) {
      dispatch(initializePlan());
      setAddError(null);
    }
  }, [dispatch, isAddPlan]);

  /**
   * plan 제출 완료 시 플래너로 화면전환
   * 에러 발생 시 화면전환 안하고 에러 출력하도록 구현 가능
   */
  useEffect(() => {
    if (!planLoading) setIsAddPlan(false);
  }, [planLoading]);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      }),
    );
  };

  // 시간 선택 이벤트 핸들러
  const onSelect = (selectedOption, e) => {
    let { value, name } = e.name.includes('start')
      ? { value: plan.startTime, name: 'startTime' }
      : { value: plan.endTime, name: 'endTime' };
    value = selectedOption
      ? e.name.includes('Hour')
        ? selectedOption.value + value.substring(2)
        : value.substring(0, 3) + selectedOption.value + ':00'
      : '00:00:00';
    dispatch(
      changeField({
        key: name,
        value: value,
      }),
    );
  };

  // 날짜 선택 이벤트 핸들러
  const handleDate = (day) => {
    setDate(formatDate(day, 'YYYY.MM.DD (ddd)'));
    setCrossBrowserDate(formatDate(day, 'YYYY-MM-DD'));
    dispatch(
      changeField({
        key: 'date',
        value: new Date(crossBrowserDate),
      }),
    );
  };

  // 플랜 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { startTime, endTime } = {
      startTime: parseInt(plan.startTime.replaceAll(':', '')),
      endTime: parseInt(plan.endTime.replaceAll(':', '')),
    };

    if (startTime >= endTime) {
      setAddError('종료시간을 시작시간 이후로\n선택해주세요.');
      return;
    }

    for (let i = 0; i < plans.length; i++) {
      if (
        // 시작시간이 다른 플랜 안쪽
        (startTime >= parseInt(plans[i].startTime.replaceAll(':', '')) &&
          startTime < parseInt(plans[i].endTime)) ||
        // 종료시간이 다른 플랜 안쪽
        (endTime > parseInt(plans[i].startTime.replaceAll(':', '')) &&
          endTime <= parseInt(plans[i].endTime.replaceAll(':', ''))) ||
        // 다른 플랜을 포함
        (startTime <= parseInt(plans[i].startTime.replaceAll(':', '')) &&
          endTime >= parseInt(plans[i].endTime.replaceAll(':', '')))
      ) {
        setAddError('동시간에 다른 플랜이 존재합니다.\n');
        return;
      }
    }

    dispatch(addPlan(plan));
  };

  // 삭제요청 전송
  const asyncRemove = async ({ subject, month, day }) => {
    try {
      await removePlan({ subject, month, day });
    } catch (e) {
      console.log(e);
    }
  };

  // 플래너 화면에서 제거
  const onRemove = ({ subject }) => {
    if (window.confirm(`${subject} 플랜을 삭제하시겠습니까?`)) {
      const formattedDate = new Date(crossBrowserDate);

      // 삭제
      asyncRemove({
        subject,
        month: formattedDate.getMonth() + 1,
        day: formattedDate.getDate(),
      }).then(() => {
        // 플래너 다시 로드
        dispatch(
          readPlanner({
            month: formattedDate.getMonth() + 1,
            day: formattedDate.getDate(),
            userId,
          }),
        );
      });
    }
  };

  return (
    <>
      {isAddPlan ? (
        <ContentsBlock style={{ display: 'flex', height: '80vh' }}>
          <AddPlan
            setIsAddPlan={setIsAddPlan}
            plan={plan}
            onChange={onChange}
            onSelect={onSelect}
            onSubmit={onSubmit}
            addError={addError}
          />
        </ContentsBlock>
      ) : (
        <Planner
          plans={plans}
          date={date}
          handleDate={handleDate}
          onRemove={onRemove}
          setIsAddPlan={setIsAddPlan}
          plannerOwner={user && userId === user.userId}
        />
      )}
    </>
  );
};

export default PlannerContainer;
