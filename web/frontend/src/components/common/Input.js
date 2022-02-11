import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

/**
 * innput container
 */
export const InputBlock = styled.div`
  display: flex;
  & + & {
    margin-top: 1rem;
  }

  ${(props) =>
    props.border &&
    css`
      position: fixed;
      bottom: 0;
      width: 600px;
      border: 1px solid ${palette.gray[5]};
      border-radius: 4px;
      overflow: hidden;
      &:focus {
        color: $oc-teal-7;
        border: 1px solid ${palette.gray[7]};
      }
    `}
`;

/**
 * styled input
 */
export const StyledInput = styled.input`
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid ${palette.gray[5]};
  outline: none;
  height: 3rem;
  width: 100%;
  padding: 1rem;
  &:focus {
    color: $oc-teal-7;
    border: 1px solid ${palette.gray[7]};
  }

  ${(props) =>
    props.none &&
    css`
      border: 0px;
      &:focus {
        color: $oc-teal-7;
        border: 0px;
      }
    `}
`;
