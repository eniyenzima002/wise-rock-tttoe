import { useGetPlayersQuery } from '../../services/RTKquery/game.endpoints';
import { toast } from 'react-toastify';
import Player from './Player';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/features/authSlice';

const ActivePlayers = () => {
  const { token } = useSelector(selectAuth);
  const { data, isError, isLoading } = useGetPlayersQuery(token);
  
  if (isError) {
    toast.error('No players available');
  }

  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-md text-gray-300"></span>
    );
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <div className="divide-y divide-cyan-600">
        {data?.map((player: string | any) => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default ActivePlayers;
