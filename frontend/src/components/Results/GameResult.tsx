import { MdDashboard } from 'react-icons/md';
import {
  usePlayerResultQuery,
  usePlayerTournamentQuery,
} from '../../services/RTKquery/game.endpoints';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/features/authSlice';
import { formatDistanceToNow } from 'date-fns';
import ResultChart from './ResultChart';

const GameResult = () => {
  const { id: pId } = useAppSelector(selectAuth);

  const {
    data: games,
    isLoading: isLoadingGame,
    isError: isErrorGame,
  } = usePlayerTournamentQuery(pId);

  const {
    data,
    isLoading: isLoadingResult,
    isError: isErrorResult,
  } = usePlayerResultQuery(pId);

  if (isErrorResult || isErrorGame) {
    toast.error('No response!');
  }

  if (isLoadingResult || isLoadingGame) {
    return (
      <span className="loading loading-spinner loading-md text-gray-300"></span>
    );
  }

  return (
    <div className="text-white m-auto w-[470px] py-2">
      <p className="flex gap-2 items-center text-amber-500 pb-2">
        <MdDashboard className="text-slate-400 text-2xl" />
        Overview
      </p>

      <div className="pb-4 drop-shadow-lg">
        <div className="flex flex-col drop-shadow-lg rounded">
          <div className="-m-1.5 px-2 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y text-left divide-gray-900">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Played
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Room Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Results
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {games?.map((game: string | any) => (
                      <>
                        {data?.map((result: string | any) => (
                          <tr
                            key={game.id}
                            className="odd:bg-slate-950 even:bg-slate-800"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                              {formatDistanceToNow(new Date(game.createdAt), {
                                addSuffix: true,
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {game.roomInfo[1]}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {result.resultMsg}
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ResultChart />
      </div>
    </div>
  );
};
export default GameResult;
