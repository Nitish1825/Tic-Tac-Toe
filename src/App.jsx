import Player from "./Components/Player"
function App() {
  
  return (
    <main>
      <div id="game-container"> 
      <ol id="players">
          <Player InitialName="Player1" Symbol="X"/>
          <Player InitialName="Player2" Symbol="O"/>
      </ol>
      GAME BOARD
      </div>
    </main>
  )
}

export default App
