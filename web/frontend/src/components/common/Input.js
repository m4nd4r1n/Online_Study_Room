import styled from 'styled-components';
import tw from 'tailwind-styled-components';

/**
 * innput container
 */
const StyledInputBlock = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

export const InputBlock = tw(StyledInputBlock)`
  flex
  ${(p) =>
    p.$border &&
    'fixed bottom-4 w-[600px] border border-gray-500 rounded-md overflow-hidden focus:text-teal-700 focus:border focus:border-gray-700'}
`;

/**
 * styled input
 */

export const StyledInput = tw.input`
  text-base
  rounded-md
  border-gray-500
  outline-none
  h-12
  w-full
  p-4
  focus:text-teal-700
  focus:border-gray-700

  ${(p) => (p.$none ? 'border-0 focus:border-0' : 'border focus:border')}
`;
