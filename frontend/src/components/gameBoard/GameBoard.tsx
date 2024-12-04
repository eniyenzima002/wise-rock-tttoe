import { useContext, useEffect, useState } from 'react';
import {
  BoardRows,
  Cell,
  GameBoard,
  OSymbol,
  PlayBlocker,
  XSymbol,
} from './board.styles';
import gameContext from '../../context/game.context';
import gameService from '../../services/game.service';
import { Notice } from '../gameContainer/container.styles';
import { useCreateResultMutation } from '../../services/RTKquery/game.endpoints';
import { selectAuth } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/app/hooks';
import GameResult from '../Results/GameResult';
import Confetti from 'confetti-react';
import gameOverSound from '../../sounds/over.wav';
import clickSound from '../../sounds/click.wav';
import { motion } from 'framer-motion';

const gameOverAudio = new Audio(gameOverSound);
gameOverAudio.volume = 0.2;
const clickAudio = new Audio(clickSound);
clickAudio.volume = 0.5;

export type IPlayMatrix = Array<Array<string | null>>;
export interface IStartGame {
  start: boolean;
  symbol: 'x' | 'o';
}

export const Game = () => {
  const { username, id: currentPlayerId } = useAppSelector(selectAuth);
  const socketPlayer = useAppSelector((state) => state?.auth?.socketService);
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [result, setResult] = useState('');
  const [history, setHistory] = useState(false);
  const [createResult, { isError, error }] = useCreateResultMutation();

  const handleResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult(e.target.value);
  };

  const {
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  } = useContext(gameContext);

  //** ********************************** */

  const checkGameState = (matrix: IPlayMatrix) => {
    for (let i = 0; i < matrix.length; i++) {
      const row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === playerSymbol)) {
        // alert("Current player won.");
        return [true, false];
      } else if (row.every((value) => value && value !== playerSymbol)) {
        // alert("The other player won 1.");
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      const column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === playerSymbol)) {
        // alert("Current player won.");
        return [true, false];
      } else if (column.every((value) => value && value !== playerSymbol)) {
        // alert("The other player won 1.");
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    //Check for a tie
    if (matrix.every((m) => m.every((v) => v !== null))) {
      // alert("Tie");
      return [true, true];
    }

    return [false, false];
  };

  //** ********************************** */

  const updateGameMatrix = (column: number, row: number, symbol: 'x' | 'o') => {
    const newMatrix = [...matrix];

    if (newMatrix[row][column] === null || newMatrix[row][column] === 'null') {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
    }

    if (socketPlayer) {
      gameService.updateGame(socketPlayer, newMatrix);

      const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);

      if (currentPlayerWon && otherPlayerWon) {
        gameService.gameWin(socketPlayer, "It's a TIE!");

        setTimeout(() => setResult("It's a TIE!"), 1000);
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socketPlayer, 'You lost!');

        setTimeout(() => setResult('You Won!'), 1000);
      }

      setPlayerTurn(false);
    }
  };

  const handleGameUpdate = () => {
    if (socketPlayer)
      gameService.onGameUpdate(socketPlayer, (newMatrix) => {
        setMatrix(newMatrix);
        setPlayerTurn(true);
        checkGameState(newMatrix);
      });
  };

  const handleGameStart = () => {
    if (socketPlayer)
      gameService.onStartGame(socketPlayer, (options) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  };

  const handleGameWin = () => {
    if (socketPlayer)
      gameService.onGameWin(socketPlayer, (message) => {
        setPlayerTurn(false);
        setResult(message);
      });
  };

  // __INIT DB RESULT__
  const sendResult = async () => {
    if (result) {
      await createResult({
        id: currentPlayerId,
        resultMsg: result,
      });
    }
    setHistory(true);
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.error);
    }
  }, [isError, error]);

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGameStart(), handleGameUpdate(), handleGameWin()]);

  useEffect(() => {
    if (matrix.some((mat) => mat !== null)) {
      clickAudio.play();
    }
  }, [matrix]);

  useEffect(() => {
    if (result) {
      gameOverAudio.play();
    }
  }, [result]);

  return (
    <>
      {!history && (
        <>
          {result ? (
            <div className="h-[500px] w-full flex flex-col items-center justify-center gap-3">
              <Confetti />
              <motion.h1
                className="text-stroke-3 font-extrabold font-serif font text-amber-300 text-6xl uppercase overflow-hidden whitespace-nowrap"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              >
                {result}
              </motion.h1>
              <form>
                <input
                  type="hidden"
                  name="result"
                  placeholder={result}
                  value={result}
                  onChange={handleResult}
                />
                <button
                  type="button"
                  onClick={sendResult}
                  className="text-green-400 cursor-pointer border border-cyan-600 p-2 rounded-md hover:border-cyan-400 hover:text-cyan-500 mt-4"
                >
                  Go to Game Results Page
                </button>
              </form>
            </div>
          ) : (
            <GameBoard>
              {!isGameStarted && (
                <Notice>Waiting for Another Player to join the Game...</Notice>
              )}

              {(!isGameStarted || !isPlayerTurn) && <PlayBlocker />}

              {isPlayerTurn && (
                  <motion.h3
                    className="flex items-center justify-center gap-2 text-xl text-cyan-400 pb-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  >
                  <span className="text-green-300">{username}</span>- It's Your
                  Turn as -
                  <span className="text-4xl text-yellow-500">
                    {playerSymbol}
                  </span>
                </motion.h3>
              )}
              
              {(isGameStarted && !isPlayerTurn) && (
                  <motion.h3
                    className="flex items-center justify-center gap-2 text-2xl text-rose-400 pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  >
                  Wait for your turn...
                </motion.h3>
              )}

              {matrix.map((row, rowIdx) => {
                return (
                  <BoardRows key={rowIdx}>
                    {row.map((column, columnIdx) => (
                      <Cell
                        key={columnIdx}
                        $borderRight={columnIdx < 2}
                        $borderLeft={columnIdx > 0}
                        $borderBottom={rowIdx < 2}
                        $borderTop={rowIdx > 0}
                        onClick={() =>
                          updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                        }
                      >
                        {column && column !== 'null' ? (
                          column === 'x' ? (
                            <XSymbol />
                          ) : (
                            <OSymbol />
                          )
                        ) : null}
                      </Cell>
                    ))}
                  </BoardRows>
                );
              })}
            </GameBoard>
          )}
        </>
      )}

      {history && <GameResult />}
    </>
  );
};
