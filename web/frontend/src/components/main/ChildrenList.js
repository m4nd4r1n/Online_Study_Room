import React from 'react';
import { Block } from '../common/Contents';
import { useNavigate } from 'react-router-dom';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';

const Child = ({ child }) => {
  const navigate = useNavigate();
  const { name, school, id, state } = child;

  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-gray-300 text-center sm:px-4">
      <Block $border>{name}</Block>
      <Block $border>{school}</Block>
      <div className="flex h-3/5 w-full items-center justify-around border-r px-1">
        {/* 학습 현황 */}
        <BsFillCameraVideoFill
          onClick={() => {
            navigate(`/study/${id}`);
          }}
        />

        {/* 학습보고서 */}
        <IoDocumentText
          onClick={() => {
            navigate(`/statistics/${id}`);
          }}
        />
      </div>
      <Block>{state}</Block>
    </div>
  );
};

const ChildrenList = () => {
  const children = [
    {
      id: '1234',
      school: '서울중',
      name: '박서울',
      state: '학습중',
    },
    {
      id: '5678',
      school: '부산고',
      name: '김부산',
      state: '오프라인',
    },
  ];

  return (
    <>
      {children.map((child) => (
        <Child child={child} />
      ))}
    </>
  );
};

export default ChildrenList;
