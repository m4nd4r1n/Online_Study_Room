import React from 'react';
import { Block } from '../common/Contents';
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts, MdMessage, MdEventNote } from 'react-icons/md';
import { setMessengerId } from '../../modules/messenger';
import { useDispatch } from 'react-redux';

const Mentee = ({ mentee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, school, id, messengerId, state } = mentee;
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-gray-300 text-center sm:px-4">
      <Block $border>{name}</Block>
      <Block $border>{school}</Block>
      <div className="flex h-3/5 w-full items-center justify-around border-r px-1">
        {/* 멘티 관리 */}
        <MdManageAccounts
          className="cursor-pointer"
          onClick={() => {
            navigate(`/management/${id}`);
          }}
        />

        {/* 플래너 */}
        <MdEventNote
          className="cursor-pointer"
          onClick={() => {
            navigate(`/planner/${id}`);
          }}
        />

        {/* 메신저 */}
        <MdMessage
          className="cursor-pointer"
          onClick={() => {
            dispatch(
              setMessengerId({
                messengerId,
                receiver: name,
              }),
            );
            navigate(`/messenger/${messengerId}`);
          }}
        />
      </div>
      <Block>{state}</Block>
    </div>
  );
};

const MenteeList = ({ mentees }) => {
  return (
    <>
      {mentees?.map((mentee, index) => (
        <Mentee mentee={mentee} key={index} />
      ))}
    </>
  );
};

export default MenteeList;
