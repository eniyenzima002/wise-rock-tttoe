import styled from "styled-components";

export const GameBoard = styled.div`
  width: 95%;
  height: 70%;
  display: flex;
  flex-direction: column;
  font-family: "Zen Tokyo Zoo", cursive;
  position: relative;
  margin: 0 auto;
  // border: 1px red solid 
  /* border: 3px #8e44ad solid;
  border-radius: 20px; */
`;

export const BoardRows = styled.div`
  width: 100%;
  display: flex;
`;

interface ICellProps {
  $borderTop?: boolean;
  $borderRight?: boolean;
  $borderLeft?: boolean;
  $borderBottom?: boolean;
}

export const Cell = styled.div<ICellProps>`
  width: 13em;
  height: 9em;
  display: flex;
  /* margin: 1px; */
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  cursor: pointer;
  border-top: ${({ $borderTop }) => $borderTop && "2px solid #2bacac"};
  border-left: ${({ $borderLeft }) => $borderLeft && "2px solid #2ca562"};
  border-bottom: ${({ $borderBottom }) => $borderBottom && "2px solid #2ca562"};
  border-right: ${({ $borderRight }) => $borderRight && "2px solid #2bacac"};
  transition: all 270ms ease-in-out;

  &:hover {
    background-color: #54e99e28;
  }
`;

export const PlayBlocker = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

export const XSymbol = styled.span`
  font-size: 100px;
  color: #2bacac;
  &::after {
    content: "X";
  }
`;

export const OSymbol = styled.span`
  font-size: 100px;
  color: #2ca562;
  &::after {
    content: "O";
  }
`;

