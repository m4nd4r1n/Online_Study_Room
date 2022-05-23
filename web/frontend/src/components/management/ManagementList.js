import React from 'react';
import { useParams } from 'react-router-dom';
import { BsFillCameraVideoFill, BsPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ManagementList = ({ state }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const isOffline = () => {
    if (state !== '학습 중') {
      window.alert('학습 중이 아닙니다.');
    } else {
      navigate(`/study/${userId}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex w-full select-none items-center justify-between border-b">
        <Button className="flex h-20 w-full" onClick={isOffline}>
          <div className="flex w-full items-center justify-between px-6">
            <BsFillCameraVideoFill />
            <span className="text-base font-bold">학습화면 확인</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M 9 19 l 7 -7 -7 -7"
              />
            </svg>
          </div>
        </Button>
      </div>
      <div className="flex w-full select-none items-center justify-between border-b">
        <Button
          className="flex h-20 w-full"
          onClick={() => navigate(`/management/time/${userId}`)}
        >
          <div className="flex w-full items-center justify-between px-6">
            <BsPencilFill />
            <span className="text-base font-bold">학습시간 확인</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M 9 19 l 7 -7 -7 -7"
              />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ManagementList;
