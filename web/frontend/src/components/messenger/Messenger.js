import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { isToday } from '../common/Date';
import { ContentsBlock } from '../common/Contents';

const Messenger = ({ messengers }) => {
  const navigate = useNavigate();
  return (
    <ContentsBlock>
      {messengers?.map((data) => (
        <div
          key={data.messengerId}
          className="flex w-full cursor-pointer select-none flex-row items-center border-b px-4 py-6 sm:px-8"
          onClick={() => {
            navigate(`/messenger/${data.messengerId}`);
          }}
        >
          <div className="ml-4 flex flex-col justify-start text-left">
            <h2 className="text-base font-bold">{data.messengerTitle}</h2>
            <span className="text-sm">{data.lastMessage}</span>
          </div>
          <span className="ml-auto">
            {isToday(new Date(data.lastReceivedTime.getTime())) ? (
              <Moment date={data.lastReceivedTime} format="h:mm A" />
            ) : (
              <Moment date={data.lastReceivedTime} format="YYYY.MM.DD" />
            )}
          </span>
        </div>
      ))}
    </ContentsBlock>
  );
};

export default Messenger;
