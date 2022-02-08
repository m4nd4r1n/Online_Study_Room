/**
 * 플래너 컨테이너
 *
 * 해당 날짜의 플랜 리스트 및 플래너 출력
 * 플랜 정보를 입력해서 추가
 *
 * 백서버 연동 후 copyPlan 제거 필요
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readPlanner, unloadPlanner } from '../../modules/planner';
import { changeField, initializePlan, addPlan } from '../../modules/plan';
import { ContentsBlock } from '../../components/common/Contents';
import PlanList from '../../components/planner/PlanList';
import Planner from '../../components/planner/Planner';
import AddPlan from '../../components/planner/AddPlan';
import { removePlan } from '../../lib/api/planner';

const PlannerContainer = () => {
  const [date, setDate] = useState(new Date());
  const [isAddPlan, setIsAddPlan] = useState(false);
  const [addError, setAddError] = useState(null);
  const dispatch = useDispatch();
  const { plans, plan, planLoading } = useSelector(
    ({ planner, plan, loading }) => ({
      plans: planner.plans,
      plan: plan.plan,
      planLoading: loading['plan/ADD_PLAN'],
    }),
  );

  // 날짜 변경 시 새 플래너 요청, 플랜 날짜 변경
  useEffect(() => {
    dispatch(readPlanner({ month: date.getMonth() + 1, day: date.getDate() }));
    dispatch(
      changeField({
        key: 'date',
        value: date,
      }),
    );
    return () => {
      dispatch(unloadPlanner());
    };
  }, [dispatch, date]);

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

  // 과목, 시간, 날짜
  const [copyPlans, setCopyPlans] = useState([
    {
      subject: '리액트',
      date: date,
      startTime: '0900',
      endTime: '1000',
    },
    {
      subject: '스프링',
      date: date,
      startTime: '1030',
      endTime: '1200',
    },
    {
      subject: '파이썬',
      date: date,
      startTime: '1400',
      endTime: '1500',
    },
  ]);

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
        : value.substring(0, 2) + selectedOption.value
      : '0000';
    dispatch(
      changeField({
        key: name,
        value: value,
      }),
    );
  };

  // 날짜 선택 이벤트 핸들러
  const handleDate = (date) => {
    setDate(date);
    dispatch(
      changeField({
        key: 'date',
        value: date,
      }),
    );
  };

  // 플랜 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { subject, date, startTime, endTime } = plan;

    if (parseInt(startTime) >= parseInt(endTime)) {
      setAddError('종료시간을 시작시간 이후로\n선택해주세요.');
      return;
    }

    for (let i = 0; i < copyPlans.length; i++) {
      if (
        // 시작시간이 다른 플랜 안쪽
        (parseInt(startTime) >= parseInt(copyPlans[i].startTime) &&
          parseInt(startTime) < parseInt(copyPlans[i].endTime)) ||
        // 종료시간이 다른 플랜 안쪽
        (parseInt(endTime) > parseInt(copyPlans[i].startTime) &&
          parseInt(endTime) <= parseInt(copyPlans[i].endTime)) ||
        // 다른 플랜을 포함
        (parseInt(startTime) <= parseInt(copyPlans[i].startTime) &&
          parseInt(endTime) >= parseInt(copyPlans[i].endTime))
      ) {
        setAddError('동시간에 다른 플랜이 존재합니다.\n');
        return;
      }
    }

    dispatch(
      addPlan({
        subject,
        date,
        startTime,
        endTime,
      }),
    );
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
  const onRemove = ({ subject, date }) => {
    if (window.confirm(`'${subject}' 플랜을 삭제하시겠습니까?`)) {
      setCopyPlans(copyPlans.filter((plan) => plan.subject !== subject));
      asyncRemove({ subject, month: date.getMonth(), day: date.getDate() });
    }
  };

  return (
    <>
      {isAddPlan ? (
        <ContentsBlock
          style={{ display: 'flex', height: '80vh', flexDirection: 'column' }}
        >
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
        <ContentsBlock style={{ display: 'flex' }}>
          <PlanList
            plans={copyPlans}
            onRemove={onRemove}
            setIsAddPlan={setIsAddPlan}
          />
          <Planner plans={copyPlans} date={date} handleDate={handleDate} />
        </ContentsBlock>
      )}
    </>
  );
};

export default PlannerContainer;
