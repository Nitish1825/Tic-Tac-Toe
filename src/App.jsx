import { useState } from "react"
import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";
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
  const activePlayer=deriveActivePlayer(gameTurns)
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
  return (
    <main>
      <div id="game-container"> 
      <ol id="players" className="highlight-player">
          <Player InitialName="Player1" Symbol="X" isActive={activePlayer ==='X'}/>
          <Player InitialName="Player2" Symbol="O" isActive={activePlayer ==='O'}/>
      </ol>
     <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
