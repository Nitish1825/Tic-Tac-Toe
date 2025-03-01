import { useState } from "react"
import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./Components/winning-combinations";
import GameOver from "./Components/GameOver";
const initialGameBoard=[[null,null,null],[null,null,null],[null,null,null]];

function deriveActivePlayer(gameTurns){
  let CurrentPlayer='X'
      if(gameTurns.length>0 && gameTurns[0].player === 'X'){
        CurrentPlayer = 'O';
      }
      return CurrentPlayer;
}
function App() {
  /*we can get activeplayer from gameturns so we are removing activeplayer
  const[activeplayer,setActivePlayer]=useState('X');
  */
  const[gameTurns,setGameTurns]=useState([]);

  const activePlayer=deriveActivePlayer(gameTurns);

  let gameBoard=[...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurns){
        const{ square, player }=turn;
        const{row,col}=square;
        
        gameBoard[row][col]=player;
    }

    let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];
    if(
      firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol
    ){
      winner = firstSquareSymbol;
    }
  }

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
  return (
    <main>
      <div id="game-container"> 
      <ol id="players" className="highlight-player">
          <Player InitialName="Player1" Symbol="X" isActive={activePlayer ==='X'}/>
          <Player InitialName="Player2" Symbol="O" isActive={activePlayer ==='O'}/>
      </ol>
      {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
     <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
