import { useState } from 'react';
import { JoinRoom } from '../gameRoom/gameRoom';
import { Game } from '../gameBoard/GameBoard';
import { PlayContainer, PlayStation } from './container.styles';
import GameContext, { IGameContextProps } from '../../context/game.context';

const GameContainer = () => {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  
  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <PlayStation>
        <PlayContainer>
          {!isInRoom && < JoinRoom />}
          { isInRoom && <Game /> }
        </PlayContainer>
      </PlayStation>
    </GameContext.Provider>
  );

};

export default GameContainer;
