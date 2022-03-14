import React from 'react';
import { Block } from '../common/Contents';
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts, MdMessage, MdEventNote } from 'react-icons/md';

const Mentee = ({ mentee }) => {
  const navigate = useNavigate();
  const { name, school, id, messengerId, state } = mentee;
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-gray-300 text-center sm:px-4">
      <Block $border>{name}</Block>
      <Block $border>{school}</Block>
      <div className="flex h-3/5 w-full items-center justify-around border-r px-1">
        {/* 멘티 관리 */}
        <MdManageAccounts
          onClick={() => {
            navigate(`/management/${id}`);
          }}
        />

        {/* 플래너 */}
        <MdEventNote
          onClick={() => {
            navigate(`/planner/${id}`);
          }}
        />

        {/* 메신저 */}
        <MdMessage
          onClick={() => {
            navigate(`/messenger/${messengerId}`);
          }}
        />
      </div>
      <Block>{state}</Block>
    </div>
  );
};

const MenteeList = () => {
  const mentees = [
    {
      id: '1234',
      school: '서울중',
      name: '박서울',
      state: '학습중',
      messengerId: 'messengerId1',
    },
    {
      id: '5678',
      school: '부산고',
      name: '김부산',
      state: '오프라인',
      messengerId: 'messengerId2',
    },
  ];

  return (
    <>
      {mentees.map((mentee, index) => (
        <Mentee mentee={mentee} key={index} />
      ))}
    </>
  );
};

export default MenteeList;
