import styled, { css } from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

export const ContentsBox = styled.div`
  flex-direction: row;
  display: flex;
`;

export const ContentsBlock = styled(Responsive)`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  width: 600px;
  text-align: center;
`;

export const ItemBlock = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: center;
`;

/**
 * styled box
 */
export const StyledBox = styled.div`
  .initial {
    color: #777777;
  }
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid ${palette.gray[5]};
  outline: none;
  width: 100%;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin-bottom: -1px;
  &:focus {
    color: $oc-teal-7;
    border: 1px solid ${palette.gray[7]};
  }

  ${(props) =>
    props.messenger &&
    css`
      border: none;
      border-radius: 0px;
      &:hover {
        background: ${palette.gray[1]};
      }
    `}

  ${(props) =>
    props.message &&
    css`
      border: none;
      border-radius: 0px;
      flex-direction: column;
      align-items: flex-start;
    `}

    ${(props) =>
    props.right &&
    css`
      flex-direction: column;
      align-items: flex-end;
    `}
    
  ${(props) =>
    props.isClicked &&
    css`
      background: ${palette.gray[2]};
      &:hover {
        background: ${palette.gray[2]};
      }
    `}
`;

/**
 * styled click box
 * 약관보기
 */
export const StyledClickBox = styled.div`
  font-size: 0.8rem;
  color: ${palette.gray[5]};
  user-select: none;
  &:hover {
    color: ${palette.gray[7]};
  }
`;
