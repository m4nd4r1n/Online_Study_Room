import tw from 'tailwind-styled-components';

export const Block = tw.span`
  flex
  h-3/5
  w-1/3
  items-center
  justify-center
  px-1
  ${(p) => p.$border && 'border-r'}
`;

export const ContentsBox = tw.div`
  flex
 flex-row
`;

export const ContentsBlock = tw.div`
  px-4
  mx-auto 
  w-full 
  max-w-2xl
  items-center
  justify-center
  text-center
  mb-[50px]
  pb-16
`;

export const ItemBlock = tw.div`
  text-base
  flex
  justify-center
`;

/**
 * styled box
 */
export const StyledBox = tw.div`
  -mb-[1px]
  flex
  w-full
  justify-between
  p-4
  text-base
  outline-none
  focus:border-gray-700
  focus:text-teal-700
  ${(p) => p.$border && 'border border-gray-400'}
  ${(p) => p.$borderb && 'rounded-none border-b border-gray-400'}
  ${(p) => p.$messenger && 'rounded-none border-none hover:bg-gray-100'}
  ${(p) =>
    p.$message
      ? 'flex-col items-start rounded-none border-none'
      : 'items-center rounded-md'}
  ${(p) => p.$right && 'flex-col items-end'}
  ${(p) => p.$isClicked && 'bg-gray-200 hover:bg-gray-200'}
  ${(p) => p.$agreement && '-mt-[1px] text-xs'}
  ${(p) => p.$pointer && 'cursor-pointer'}
`;

/**
 * styled click box
 * 약관보기
 */
export const StyledClickBox = tw.div`
  text-xs
  text-gray-500
  select-none
  hover:text-gray-700
`;

export const StyledText = tw.span`
  text-gray-900
  ${(p) => `text-[${p.$size}] text-[${p.$color}]`}
  ${(p) => p.$center && 'flex items-center justify-center'}
  ${(p) => p.$small && 'text-base'}
`;
