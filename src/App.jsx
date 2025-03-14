import { useState } from "react"
import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./Components/winning-combinations";
import GameOver from "./Components/GameOver";

const PLAYERS={
  X : 'PLAYER 1',
  O : 'PLAYER 2'
}

const INITIAL_GAME_BOARD=[[null,null,null],[null,null,null],[null,null,null]];

function deriveActivePlayer(gameTurns){
  let CurrentPlayer='X'
      if(gameTurns.length>0 && gameTurns[0].player === 'X'){
        CurrentPlayer = 'O';
      }
      return CurrentPlayer;
}

function derviveWinner(gameBoard, players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];
    if(
      firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol];
    }
    }

    return winner;
  }


  function deriveGameBoard(gameTurns){
    let gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])];

    for(const turn of gameTurns){
        const{ square, player }=turn;
        const{row,col}=square;
        
        gameBoard[row][col]=player;
    }
    return gameBoard;
  }

function App() {
  const[gameTurns,setGameTurns]=useState([]);
  const[players,setPlayers]=useState(PLAYERS);
  function handlePlayerNameChange(symbol,newName){
    setPlayers((prevPlayers)=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      };
    });
    }

  const activePlayer=deriveActivePlayer(gameTurns);

  const gameBoard=deriveGameBoard(gameTurns);

   const winner=derviveWinner(gameBoard,players)

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{
      let CurrentPlayer=deriveActivePlayer(prevTurns)
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player:CurrentPlayer},
        ...prevTurns,
      ]
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }
  //added a new feature testing push
  return (
    <main>
      <div id="game-container"> 
      <ol id="players" className="highlight-player">
          <Player InitialName={PLAYERS.X} Symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayerNameChange}/>
          <Player InitialName={PLAYERS.O} Symbol="O" isActive={activePlayer ==='O'}/>
      </ol>
      {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
     <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
