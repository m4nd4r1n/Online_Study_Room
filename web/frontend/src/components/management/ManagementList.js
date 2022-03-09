import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import Button from '../common/Button';
import { ItemBlock, StyledBox } from '../common/Contents';
import { useParams } from 'react-router-dom';
import { ListItem } from '../common/List';
import { BsFillCameraVideoFill, BsPencilFill } from 'react-icons/bs';

const StyledButton = tw(Button)`
  no-underline
  border-0
  text-inherit
  hover:text-gray-700
  hover:border-0
  focus:ring-0
`;

const ManagementList = () => {
  const { userId } = useParams();

  return (
    <>
      <ItemBlock>
        <StyledBox $border>
          <ListItem auto>
            <BsFillCameraVideoFill />
          </ListItem>
          <ListItem fullwidth className="font-bold">
            학습화면 확인
          </ListItem>
          <ListItem auto>
            <StyledButton white="true" to={`/study/${userId}`}>
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
            </StyledButton>
          </ListItem>
        </StyledBox>
      </ItemBlock>
      <ItemBlock>
        <StyledBox $border>
          <ListItem auto>
            <BsPencilFill />
          </ListItem>
          <ListItem fullwidth className="font-bold">
            학습시간 확인
          </ListItem>
          <ListItem auto>
            <StyledButton white="true" to={`/management/time/${userId}`}>
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
            </StyledButton>
          </ListItem>
        </StyledBox>
      </ItemBlock>
    </>
  );
};

export default ManagementList;
