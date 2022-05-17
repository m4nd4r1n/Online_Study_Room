import React, { useState } from 'react';
import { ContentsBlock } from '../common/Contents';
import { setMentorMentee, deleteMentorMentee } from '../../lib/api/admin';

const Admin = ({
  mentor,
  setMentor,
  mentorList,
  menteeList,
  allMenteeList,
}) => {
  const [mtrName, setMtrName] = useState('');
  return (
    <ContentsBlock>
      <div className="mt-4 flex h-[88vh] w-full rounded border-[1.5px] border-gray-400">
        <div className="flex w-1/2 flex-col overflow-y-scroll border-r-[1.5px] border-gray-400 scrollbar-hide">
          <span className="border-b-[1.5px] border-gray-400 text-base font-semibold">
            멘토
          </span>
          {mentorList?.map((data, i) => (
            <div
              key={i}
              className="grid cursor-pointer grid-cols-3 items-start border-b px-2 transition-colors hover:bg-cyan-50"
              onClick={() => {
                setMentor(data?.mtrId);
                setMtrName(data?.name);
              }}
            >
              <div className="flex flex-col items-start">
                <span>E-mail:</span>
                <span>성명:</span>
                <span>전화번호:</span>
              </div>
              <div className="col-span-2 flex flex-col items-start">
                <span>{data?.mtrId}</span>
                <span>{data?.name}</span>
                <span>{data?.phone}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-1/2 flex-col">
          <span className="border-b-[1.5px] border-gray-400 text-base font-semibold">
            멘티
          </span>
          <div className="flex h-1/2 flex-col overflow-y-scroll scrollbar-hide">
            {mtrName &&
              menteeList?.map((data, i) => (
                <div
                  key={i}
                  className="grid cursor-pointer grid-cols-3 items-start border-b px-2 transition-colors hover:bg-cyan-50"
                  onClick={() => {
                    if (
                      window.confirm(
                        `멘티 '${data?.name}'님과 멘토 '${mtrName}'님의 연결을 해제합니다.`,
                      )
                    ) {
                      deleteMentorMentee(mentor, data?.mteId);
                    }
                  }}
                >
                  <div className="flex flex-col items-start">
                    <span>E-mail:</span>
                    <span>성명:</span>
                    <span>학교:</span>
                    <span>전화번호:</span>
                  </div>
                  <div className="col-span-2 flex flex-col items-start">
                    <span>{data?.mteId}</span>
                    <span>{data?.name}</span>
                    <span>{data?.school}</span>
                    <span>{data?.phone}</span>
                  </div>
                </div>
              ))}
          </div>
          <span className="border-y-[1.5px] border-gray-400 text-base font-semibold">
            전체 멘티
          </span>
          <div className="flex h-1/2 flex-col overflow-y-scroll scrollbar-hide">
            {mtrName &&
              allMenteeList?.map((data, i) => (
                <div
                  key={i}
                  className="grid cursor-pointer grid-cols-3 items-start border-b px-2 transition-colors hover:bg-cyan-50"
                  onClick={() => {
                    if (
                      window.confirm(
                        `멘티 '${data?.name}'님과 멘토 '${mtrName}'님을 연결합니다.`,
                      )
                    ) {
                      setMentorMentee(mentor, data?.mteId);
                    }
                  }}
                >
                  <div className="flex flex-col items-start">
                    <span>E-mail:</span>
                    <span>성명:</span>
                    <span>학교:</span>
                    <span>전화번호:</span>
                  </div>
                  <div className="col-span-2 flex flex-col items-start">
                    <span>{data?.mteId}</span>
                    <span>{data?.name}</span>
                    <span>{data?.school}</span>
                    <span>{data?.phone}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </ContentsBlock>
  );
};

export default Admin;
