import React from 'react';
import tw from 'tailwind-styled-components';
import { SelectCalendar } from '../common/Calendar';
import { ItemBlock, StyledBox } from '../common/Contents';
import { ContentsBlock } from '../common/Contents';
import { cls } from '../../lib/utils';
import { BsPlus, BsX } from 'react-icons/bs';

const PlanBox = tw(StyledBox)`
  text-[1.2rem]
  font-bold
  rounded-none
  h-[51px]
  hover:shadow-sm
  ${(p) => p.$color && `${p.$color}`}
`;

const IconWrapper = tw.div`
  w-6
  h-6
  cursor-pointer
`;

const hours = [
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '00',
  '01',
  '02',
  '03',
  '04',
];

const COLORS = ['bg-cyan-500', 'bg-cyan-200', 'bg-cyan-400', 'bg-cyan-100'];

const Table = ({ hour, plans }) => {
  return (
    <div className="flex flex-row">
      <div className="h-[1.7rem] w-full border-[0.5px] border-slate-300">
        {hour}
      </div>
      {['00', '10', '20', '30', '40', '50'].map((minute, i) => {
        let color;
        if (plans) {
          for (let j = 0; j < plans.length; j++) {
            if (
              parseInt((hour + minute) * 100) >=
                parseInt(plans[j].startTime.replaceAll(':', '')) &&
              parseInt((hour + minute) * 100) <
                parseInt(plans[j].endTime.replaceAll(':', ''))
            )
              color = COLORS[j % 4];
          }
        }
        return (
          <div
            className={cls(
              color,
              'h-[1.7rem] w-full divide-solid border-[0.5px] border-slate-300',
            )}
            key={i}
          ></div>
        );
      })}
    </div>
  );
};

const Plan = ({ plan, index, onRemove, plannerOwner }) => {
  const color = COLORS[index % 4];

  return (
    <ItemBlock>
      <PlanBox $color={color}>
        <span className="text-center text-base font-normal">
          {plan.subject}
        </span>
        {plannerOwner && (
          <IconWrapper
            onClick={() =>
              onRemove({
                subject: plan.subject,
              })
            }
          >
            <BsX size="25px" />
          </IconWrapper>
        )}
      </PlanBox>
    </ItemBlock>
  );
};

const PlanList = ({ plans, onRemove, setIsAddPlan, plannerOwner }) => {
  return (
    <>
      {plans?.map((plan, index) => (
        <Plan
          plan={plan}
          index={index}
          key={index}
          onRemove={onRemove}
          plannerOwner={plannerOwner}
        />
      ))}
      {plannerOwner && (
        <PlanBox $color="bg-gray-700">
          <span className="text-center text-base font-normal text-white">
            플랜 추가
          </span>
          <IconWrapper onClick={() => setIsAddPlan(true)}>
            <BsPlus size="25px" color="#ffffff" />
          </IconWrapper>
        </PlanBox>
      )}
    </>
  );
};

const Planner = ({
  plans,
  date,
  handleDate,
  onRemove,
  setIsAddPlan,
  plannerOwner,
}) => {
  return (
    <ContentsBlock>
      <div className="mt-4 grid grid-cols-3">
        <div className="flex flex-col">
          <span className="mb-1.5">PLAN</span>
          <PlanList
            plans={plans}
            onRemove={onRemove}
            setIsAddPlan={setIsAddPlan}
            plannerOwner={plannerOwner}
          />
        </div>
        <div className="col-span-2 ml-4">
          <SelectCalendar date={date} handleChange={handleDate} />
          <div className="mt-1 border-[0.5px] border-slate-300">
            {hours.map((hour, i) => (
              <Table key={i} hour={hour} plans={plans} />
            ))}
          </div>
        </div>
      </div>
    </ContentsBlock>
  );
};

export default Planner;
