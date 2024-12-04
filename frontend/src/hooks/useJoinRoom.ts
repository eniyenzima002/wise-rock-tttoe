import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../redux/features/authSlice';
import {
  useJoinRoomMutation,
  usePlayerRoomQuery,
} from '../services/RTKquery/game.endpoints';
// import socketService from "../services/socket.service";
import { toast } from 'react-toastify';
import gameService from '../services/game.service';
import gameContext from '../context/game.context';
import { useAppSelector } from '../redux/app/hooks';

const useJoinRoom = () => {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState({});
  const [isJoining, setJoining] = useState(false);
  const { token, id: joinPlayerId } = useSelector(selectAuth);
  const socketPlayer = useAppSelector((state) => state?.auth?.socketService);
  const [joinRoom, { isError: isJoinError, error: joinError, isSuccess }] =
    useJoinRoomMutation();

  const { setInRoom } = useContext(gameContext);
  const { data: rooms, isLoading, isError } = usePlayerRoomQuery(token);

  const options = rooms?.map((room: string | any) => ({
    value: room.playerId,
    label: room.name,
  }));

  const handleChange = () => {
    navigate(`/join/${options[0].value}`);
    setSelectedName({ ...options });
  };

  const handleJoinRoom = async () => {
    if (!options[0].label || !socketPlayer) {
      return toast.error('Please, select a room name.');
    }

    if (options[0].label) {
      await joinRoom({
        ...selectedName,
        roomName: options[0].label,
        playerId: options[0].value,
      });

      setJoining(true);
      const joined = await gameService
        .gameRoom(socketPlayer, options[0].label, joinPlayerId)
        .catch((err) => {
          alert(err);
        });

      if (joined) setInRoom(true);
      navigate(`/results/${joinPlayerId}`);

      if (isSuccess) {
        toast.success('You have joined the game!');
      }

      setJoining(false);
    }
  };

  useEffect(() => {
    if (isJoinError) {
      toast.error((joinError as any).data.error);
    }
  }, [isJoinError, joinError]);

  return {
    handleChange,
    handleJoinRoom,
    isLoading,
    isError,
    rooms,
    options,
    isJoining,
  };
};

export default useJoinRoom;
