import React from 'react';
import { Link } from 'react-router-dom';
import { MdPlayCircleOutline } from 'react-icons/md';
import { MdStopCircle } from 'react-icons/md';
import tw from 'tailwind-styled-components';

const TwButton = tw.button`
  flex
  cursor-pointer
  items-center
  justify-center
  rounded-md
  border-0
  px-4
  py-1
  font-bold
  outline-none
  transition-colors
  focus:ring-2
  focus:ring-offset-2
  ${(p) => (p.$fullwidth ? 'w-full pt-3 pb-3 text-lg' : 'text-base')}
  ${(p) =>
    p.$cyan
      ? 'bg-cyan-500 hover:bg-cyan-400 focus:ring-cyan-500'
      : 'bg-gray-600 hover:bg-gray-500 focus:ring-gray-600'}
  ${(p) =>
    p.$disabled
      ? 'cursor-not-allowed bg-gray-300 text-gray-400 hover:bg-gray-300'
      : 'text-white'}
  ${(p) => (p.$left ? 'rounded-r-none' : '')}
  ${(p) => (p.$right ? 'rounded-l-none' : '')}
`;

const TwLink = tw(Link)`
  flex
  cursor-pointer
  items-center
  justify-center
  rounded-md
  border-0
  px-4
  py-1
  font-bold
  outline-none
  transition-colors
  focus:ring-2
  focus:ring-offset-2
  text-center
  ${(p) => (p.$fullwidth ? 'w-full pt-3 pb-3 text-lg' : 'text-base')}
  ${(p) =>
    p.$cyan
      ? 'bg-cyan-500 hover:bg-cyan-400 focus:ring-cyan-500'
      : 'bg-gray-600 hover:bg-gray-500 focus:ring-gray-600'}
  ${(p) =>
    p.$disabled
      ? 'cursor-not-allowed bg-gray-300 text-gray-400 hover:bg-gray-300'
      : 'text-white'}
  ${(p) => (p.$left ? 'rounded-r-none' : '')}
  ${(p) => (p.$right ? 'rounded-l-none' : '')}
`;

const Button = (props) => {
  return props.to ? (
    <TwLink
      $cyan={props.cyan}
      $fullwidth={props.fullwidth}
      $disabled={props.disabled}
      $left={props.left}
      $right={props.right}
      {...props}
    />
  ) : (
    <TwButton
      $cyan={props.cyan}
      $fullwidth={props.fullwidth}
      $disabled={props.disabled}
      $left={props.left}
      $right={props.right}
      {...props}
    />
  );
};

export default Button;

export const StudyButton = (props) => {
  return (
    <>
      <Button
        fullwidth="true"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4rem',
        }}
        {...props}
      >
        {props.type === 'stop' ? (
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
