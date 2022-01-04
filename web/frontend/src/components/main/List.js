import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

/**
 * 세로줄
 */
export const Divider = styled.div`
  border: 1px solid ${palette.gray[5]};
  width: 0.1rem;
  height: 100%;
`;

/**
 * 리스트 구성 아이템
 */
export const ListItem = styled.div`
  padding: 0.25rem 1rem;
  width: 20%;
  text-align: center;
  justify-content: space-around;

  ${(props) =>
    props.fullwidth &&
    css`
      display: flex;
      width: 40%;
    `}

  ${(props) =>
    props.index &&
    css`
      width: 7%;
    `}

    ${(props) =>
    props.icon &&
    css`
      &:hover {
        background-color: ${palette.LemonChiffon};
      }
    `}
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${palette.LemonChiffon};
  }
`;
