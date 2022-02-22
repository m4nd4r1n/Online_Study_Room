import React, { useState } from 'react';
import { cls } from '../../lib/utils';

const Ranking = () => {
  const [type, setType] = useState('time');
  const [time, setTime] = useState('day');
  const onTimeClick = () => {
    setType('time');
  };
  const onLevelClick = () => {
    setType('level');
  };
  const onDayClick = () => {
    setTime('day');
  };
  const onWeekClick = () => {
    setTime('week');
  };
  const onMonthClick = () => {
    setTime('month');
  };
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="px-4">
        <div className="mt-4 pb-16">
          <div>
            <div className="grid h-10 w-full grid-cols-2 border-b">
              <button
                className={cls(
                  'border-b-2 pb-2 text-lg font-medium',
                  type === 'time'
                    ? ' border-teal-500 text-teal-400'
                    : 'border-transparent text-gray-500 transition-colors hover:text-gray-400',
                )}
                onClick={onTimeClick}
              >
                학습시간
              </button>
              <button
                className={cls(
                  'border-b-2 pb-2 text-lg font-medium',
                  type === 'level'
                    ? ' border-teal-500 text-teal-400'
                    : 'border-transparent text-gray-500 transition-colors hover:text-gray-400',
                )}
                onClick={onLevelClick}
              >
                레벨
              </button>
            </div>
          </div>
          <div className="h-4 w-full " />
          <div>
            {type === 'time' && (
              <div className="grid h-10 w-full grid-cols-3 border-b">
                <button
                  className={cls(
                    'border-b-2 text-sm font-medium',
                    time === 'day'
                      ? ' border-teal-500 text-teal-400'
                      : 'border-transparent text-gray-500 transition-colors hover:text-gray-400',
                  )}
                  onClick={onDayClick}
                >
                  일간
                </button>
                <button
                  className={cls(
                    'border-b-2 text-sm font-medium',
                    time === 'week'
                      ? ' border-teal-500 text-teal-400'
                      : 'border-transparent text-gray-500 transition-colors hover:text-gray-400',
                  )}
                  onClick={onWeekClick}
                >
                  주간
                </button>
                <button
                  className={cls(
                    'border-b-2 text-sm font-medium',
                    time === 'month'
                      ? ' border-teal-500 text-teal-400'
                      : 'border-transparent text-gray-500 transition-colors hover:text-gray-400',
                  )}
                  onClick={onMonthClick}
                >
                  월간
                </button>
              </div>
            )}
          </div>
          <div className="my-2 grid h-8 w-full select-none grid-cols-3 items-center text-center">
            {type === 'time' ? (
              <>
                <span>현재 학습중 ?명</span>
                <span>금일 전체 ?명</span>
              </>
            ) : (
              <>
                <span></span>
                <span></span>
              </>
            )}
            <span>나의 등수 ?등</span>
          </div>
          <div className="grid w-full select-none grid-cols-3 items-center border-b pb-2 text-center">
            <span>등수</span>
            <span>정보</span>
            {type === 'time' ? <span>학습시간</span> : <span>레벨</span>}
          </div>

          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <div
              key={i}
              className="grid w-full select-none grid-cols-3 items-center border-b py-1 text-center"
            >
              <span className="ml-12 flex aspect-square w-14 items-center justify-center rounded-full border-2 border-teal-400 shadow-md sm:ml-20 ">
                {i + 1}
              </span>
              <div className="flex flex-col items-center justify-center">
                <span>OOO학교</span>
                <span>OOO학생</span>
              </div>
              <span>12:34</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
