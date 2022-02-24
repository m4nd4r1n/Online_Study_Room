import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { List } from 'react-virtualized';
import tw from 'tailwind-styled-components';

export const StyledList = styled(List)`
  --ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const NoScrollbar = styled.div`
  --ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TwList = tw(NoScrollbar)`
  flex
  justify-between
  px-4
  
`;

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
    props.column &&
    css`
      display: flex;
      flex-direction: column;
    `}

  ${(props) =>
    props.large &&
    css`
      display: flex;
      width: 80%;
    `}

  ${(props) =>
    props.fullwidth &&
    css`
      display: flex;
      width: 100%;
    `}

  ${(props) =>
    props.title &&
    css`
      display: flex;
      width: 65%;
    `}


  ${(props) =>
    props.auto &&
    css`
      width: auto;
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

    ${(props) =>
    props.left &&
    css`
      justify-content: flex-start;
      border-radius: 6px;
      background-color: ${palette.gray[1]};
    `}

    ${(props) =>
    props.right &&
    css`
      justify-content: flex-end;
      border-radius: 6px;
      background-color: ${palette.AliceBlue};
    `}
`;

/**
 * 리스트 아이템 텍스트
 */
export const ListItemText = styled.span`
  ${(props) =>
    props.title &&
    css`
      font-weight: bold;
      margin-bottom: 2px;
    `}

  ${(props) =>
    props.small &&
    css`
      font-size: 0.8rem;
    `}

  ${(props) =>
    props.largeMargin &&
    css`
      margin-bottom: 8px;
    `}
  
  ${(props) =>
    props.center &&
    css`
      justify-content: center;
    `}

    ${(props) =>
    props.left &&
    css`
      text-align: left;
    `}
    
    ${(props) =>
    props.right &&
    css`
      text-align: right;
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
