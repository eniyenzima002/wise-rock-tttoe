import { GiTabletopPlayers } from 'react-icons/gi';

const Player = ({ player }: { player: any }) => {
    const letter = player.username.split('');
    const playerFirstLetter = letter[1].toString().toUpperCase();

  return (
    <div>
      <div className="flex gap-2 items-center justify-center hover:bg-cyan-900 rounded p-3 cursor-pointer">
        <div className="avatar online placeholder">
          <div className="bg-cyan-700 text-neutral-content w-8 opacity-50 rounded-full">
            <span className="text-lg text-cyan-200">
              {playerFirstLetter}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-3 justify-between">
            <p>{player.username}</p>
            <span className="text-cyan-300">
              <GiTabletopPlayers />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Player;
