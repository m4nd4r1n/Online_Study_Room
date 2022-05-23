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
          className="cursor-pointer"
          onClick={() => {
            if (state === '오프라인') {
              window.alert('학생이 오프라인 상태입니다.');
            } else {
              navigate(`/study/${id}`);
            }
          }}
        />

        {/* 학습보고서 */}
        <IoDocumentText
          className="cursor-pointer"
          onClick={() => {
            navigate(`/statistics/${id}`);
          }}
        />
      </div>
      <Block>{state}</Block>
    </div>
  );
};

const ChildrenList = ({ children }) => {
  return (
    <>
      {children?.map((child, index) => (
        <Child child={child} key={index} />
      ))}
    </>
  );
};

export default ChildrenList;
