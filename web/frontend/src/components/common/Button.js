import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { MdPlayCircleOutline } from 'react-icons/md';
import { MdStopCircle } from 'react-icons/md';

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[7]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullwidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }

  ${(props) =>
    props.left &&
    css`
      border-bottom-right-radius: 0%;
      border-top-right-radius: 0%;
    `}

  ${(props) =>
    props.right &&
    css`
      border-bottom-left-radius: 0%;
      border-top-left-radius: 0%;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  text-align: center;
  ${buttonStyle};
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;

export const StudyButton = ({ type }) => {
  return (
    <>
      <Button
        fullwidth
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4rem',
        }}
      >
        {type === 'stop' ? (
          <>
            <MdStopCircle />
            <span style={{ marginLeft: '5px' }}>학습종료</span>
          </>
        ) : (
          <>
            <MdPlayCircleOutline />
            <span style={{ marginLeft: '5px' }}>학습시작</span>
          </>
        )}
      </Button>
    </>
  );
};
