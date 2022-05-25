import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { isToday } from '../common/Date';
import { ContentsBlock } from '../common/Contents';
import { setMessengerId } from '../../modules/messenger';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

const Messenger = ({ messengers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <ContentsBlock>
      {messengers?.map((data) => (
        <div
          key={data?.messengerId}
          className="flex h-20 w-full min-w-full cursor-pointer select-none flex-row items-center border-b bg-white"
        >
          <Button
            variant="text"
            className="flex h-full w-full cursor-pointer select-none flex-row items-center rounded-none px-4 py-6 sm:px-8"
            onClick={() => {
              dispatch(
                setMessengerId({
                  messengerId: data?.messengerId,
                  receiver: data?.messengerTitle,
                }),
              );
              navigate(`/messenger/${data?.messengerId}`);
            }}
          >
            <div className="ml-5 flex flex-col justify-start text-left">
              <h2 className="text-base font-bold">{data?.messengerTitle}</h2>
              <span className=" max-w-prose truncate text-sm">
                {data?.lastMessage}
              </span>
            </div>
            <span className="ml-auto mr-5">
              {data?.lastReceivedTime &&
              isToday(new Date(data?.lastReceivedTime.getTime())) ? (
                <Moment date={data?.lastReceivedTime} format="h:mm A" />
              ) : (
                <Moment date={data?.lastReceivedTime} format="YYYY.MM.DD" />
              )}
            </span>
          </Button>
        </div>
      ))}
    </ContentsBlock>
  );
};

export default Messenger;
