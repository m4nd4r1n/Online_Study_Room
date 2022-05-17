import React, { useState } from 'react';
import { cls } from '../../lib/utils';
import { getRanking } from '../../lib/api/ranking';
import useSWRInfinite from 'swr/infinite';

const Ranking = ({ ranks }) => {
  const [type, setType] = useState('time');
  const [time, setTime] = useState('day');
  const getKey = (index) =>
    `/api/ranking?page=${index + 1}&type=${type}&time=${
      type === 'time' ? time : ''
    }`;
  const { data, size, setSize } = useSWRInfinite(getKey, getRanking, {
    revalidateFirstPage: false,
    dedupingInterval: 0,
  });
  const isEnd = data && data[data.length - 1]?.length < 25;
  const issues = data ? [].concat(...data) : [];
  const onTimeClick = () => {
    if (type !== 'time') setSize(0);
    setType('time');
  };
  const onLevelClick = () => {
    if (type !== 'level') setSize(0);
    setType('level');
    setTime('day');
  };
  const onDayClick = () => {
    if (time !== 'day') setSize(0);
    setTime('day');
  };
  const onWeekClick = () => {
    if (time !== 'week') setSize(0);
    setTime('week');
  };
  const onMonthClick = () => {
    if (time !== 'month') setSize(0);
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
                    ? ' border-cyan-500 text-cyan-400'
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
                    ? ' border-cyan-500 text-cyan-400'
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
                      ? ' border-cyan-500 text-cyan-400'
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
                      ? ' border-cyan-500 text-cyan-400'
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
                      ? ' border-cyan-500 text-cyan-400'
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
            {type === 'time' && time === 'day' ? (
              <>
                <span>현재 학습중 {ranks?.current}명</span>
                <span>금일 전체 {ranks?.today}명</span>
              </>
            ) : (
              <>
                <span></span>
                <span></span>
              </>
            )}
            <span>
              나의 등수{' '}
              {type === 'time'
                ? time === 'day'
                  ? ranks?.day
                  : time === 'week'
                  ? ranks?.week
                  : time === 'month'
                  ? ranks?.month
                  : null
                : ranks?.level}
              등
            </span>
          </div>
          <div className="grid w-full select-none grid-cols-3 items-center border-b pb-2 text-center">
            <span>등수</span>
            <span>정보</span>
            {type === 'time' ? <span>학습시간</span> : <span>레벨</span>}
          </div>

          {issues?.map((data, i) => (
            <div
              key={i}
              className="grid w-full select-none grid-cols-3 items-center border-b py-1 text-center"
            >
              <span className="ml-8 flex aspect-square w-14 items-center justify-center rounded-full border-2 border-cyan-400 shadow-md sm:ml-20">
                {i + 1}
              </span>
              <div className="flex flex-col items-center justify-center">
                <span>{data?.school}</span>
                <span>{data?.name}</span>
              </div>
              <span>{type === 'time' ? data?.time : data?.level}</span>
            </div>
          ))}
          {!isEnd && (
            <button
              className="mt-4 h-12 w-full border-t px-4 font-medium"
              onClick={() => setSize(size + 1)}
            >
              더보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
