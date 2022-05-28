import React from 'react';
import Moment from 'react-moment';
import { StyledBox } from '../common/Contents';
import { ListItem, ListItemText } from '../common/List';

const StudyTime = ({ studyTime, acceptTime, userId }) => {
  return (
    <>
      <StyledBox className="h-16 bg-slate-400">
        <ListItem quarter column>
          <ListItemText>미인식</ListItemText>
          <ListItemText>시점</ListItemText>
        </ListItem>
        <ListItem fullwidth>
          <ListItemText>캡쳐 화면</ListItemText>
        </ListItem>
        <ListItem quarter column>
          <ListItemText>학습시간</ListItemText>
          <ListItemText>인정</ListItemText>
        </ListItem>
      </StyledBox>
      {studyTime?.map((data, index) => {
        const { imageDest, noAcceptTime } = data;
        return (
          <div key={index}>
            <StyledBox $borderb>
              <ListItem quarter>
                <ListItemText>
                  <Moment date={noAcceptTime} format="YYYY.MM.DD hh:mm:ss" />
                </ListItemText>
              </ListItem>
              <ListItem fullwidth>
                {imageDest && (
                  <img
                    src={
                      process.env.NODE_ENV !== 'development'
                        ? `http://localhost:8080/api/image/${imageDest}`
                        : `http://ec2-3-38-228-132.ap-northeast-2.compute.amazonaws.com:8080/api/image/${imageDest}`
                    }
                    alt="이미지를 불러오지 못했습니다."
                  />
                )}
              </ListItem>
              <ListItem quarter>
                <button onClick={() => acceptTime({ userId, noAcceptTime })}>
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </button>
              </ListItem>
            </StyledBox>
          </div>
        );
      })}
    </>
  );
};

export default StudyTime;
