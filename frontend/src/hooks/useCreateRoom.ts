import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { selectAuth } from '../redux/features/authSlice';
import { useCreateRoomMutation } from '../services/RTKquery/game.endpoints';
import gameContext from '../context/game.context';
import { toast } from 'react-toastify';
// import socketService from "../services/socket.service";
import gameService from '../services/game.service';
import { useNavigate } from 'react-router-dom';

const initialRoomName = {
  roomName: '',
};

const useCreateRoom = () => {
  const { username, id: playerId } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const socketPlayer = useAppSelector((state) => state?.auth?.socketService);
  const [room, setRoom] = useState(initialRoomName);
  const [isJoining, setJoining] = useState(false);

  const { roomName } = room;
  const handleRoomNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const [createRoomName, { isError, error, isSuccess }] =
    useCreateRoomMutation();

  const { setInRoom } = useContext(gameContext);

  const handleCreateRoom = async () => {
    if (!roomName || !socketPlayer) {
      toast.error('Please, enter a room name.');
      setRoom({ roomName: '' });
      return;
    }

    if (roomName) {
      await createRoomName({
        roomName,
        playerId,
      });
    }

    if (isSuccess) {
      toast.success('Room create successfully!');
    }

    setJoining(true);
    const joined = await gameService
      .gameRoom(socketPlayer, roomName, playerId)
      .catch((err) => {
        alert(err);
      });
    if (joined) setInRoom(true);
    
    navigate(`/results/${playerId}`);

    setJoining(false);
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.error);
    }
  }, [isError, error]);

  return {
    handleRoomNameValue,
    handleCreateRoom,
    username,
    isJoining,
    roomName,
    playerId,
  };
};

export default useCreateRoom;
