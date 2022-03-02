import React from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import Moment from 'react-moment';
import Button from '../common/Button';
import { ContentsBlock } from '../common/Contents';
import { isSameDay } from '../common/Date';
import { StyledInput } from '../common/Input';

const Message = ({ user, messages, onChange, onClick, message }) => {
  const dateLine = messages?.map((data, i, array) =>
    isSameDay(array[i - 1]?.messageTime ?? new Date(), data.messageTime)
      ? false
      : true,
  );
  return (
    <ContentsBlock>
      <div className="mb-8">
        {messages?.map((data, i) => (
          <div key={i} className="flex flex-col">
            {dateLine?.[i] && (
              <Moment
                className="my-2"
                date={data.messageTime}
                format="YYYY년 M월 D일"
              ></Moment>
            )}
            {user.name === data.name ? (
              <div className="my-1 ml-auto flex h-1/3 w-auto flex-col rounded-md bg-sky-100 py-2 px-4 text-right">
                <span className="text-base">{data.message}</span>
                <Moment date={data.messageTime} format="h:mm A" />
              </div>
            ) : (
              <div className="my-1 mr-auto flex h-1/3 w-auto flex-col rounded-md bg-gray-100 py-2 px-4 text-left">
                <span className="text-base">{data.message}</span>
                <Moment date={data.messageTime} format="h:mm A" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 right-auto z-20 mx-auto flex w-full max-w-2xl justify-center overflow-hidden bg-white py-4 pr-8">
        <div className="w-full rounded-l-md border border-gray-500">
          <StyledInput $none="true" onChange={onChange} value={message} />
        </div>
        <Button $right="true" type="send" onClick={onClick}>
          <IoPaperPlaneOutline className="text-sky-400" size="25px" />
        </Button>
      </div>
    </ContentsBlock>
  );
};

export default Message;
