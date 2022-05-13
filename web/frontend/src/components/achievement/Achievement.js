import React from 'react';
import achievementData from './achievement_list.json';
import { AiFillTrophy } from 'react-icons/ai';

const Achievement = ({ achievements }) => {
  const data = achievementData.normal;

  const complete =
    achievements &&
    achievements?.map((data) => ({
      id: data.id,
      date:
        data.date.getFullYear() +
        '.' +
        (data.date.getMonth() + 1) +
        '.' +
        data.date.getDate(),
    }));

  return (
    <>
      {data.map((data) => (
        <div
          key={data.id}
          className="flex w-full select-none flex-row items-center border-b px-4 py-4 sm:px-8"
        >
          <AiFillTrophy className="fill-cyan-500" />
          <div className="ml-4 flex flex-col justify-start text-left sm:ml-10">
            <span className="pb-1 text-base font-bold">{data.title}</span>
            <span>{data.description}</span>
            <span>{data.exp}XP</span>
          </div>
          {complete && complete?.find((d) => d.id === data.id) ? (
            <span className="ml-auto">
              {complete?.find((d) => d.id === data.id).date}
            </span>
          ) : (
            <span className="ml-auto">미달성</span>
          )}
        </div>
      ))}
    </>
  );
};

export default Achievement;
