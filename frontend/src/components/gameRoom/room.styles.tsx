import styled from "styled-components";

const RoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2em auto;
  text-align: center;
`;

const RoomIdInput = styled.input`
  height: 40px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border: 1px solid #2491a0;
  background-color: #164e63;
  opacity: 0.9;
  border-radius: 3px;
  padding: 0 10px;
`;

const CreateButton = styled.button`
  outline: none;
  background-color: #2491a0;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid #449dad;
    color: #fff;
  }
`;

const JoinButton = styled.button`
  outline: none;
  background-color: #2491a0;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid #449dad;
    color: #fff;
  }
`;

export { RoomContainer, RoomIdInput, CreateButton, JoinButton };