import { useState } from "react";
export default function Player({InitialName,Symbol}){
    const[isEditing,setIsEditing]=useState(false);
    const[player,setPlayer]=useState(InitialName);
   let PlayerName=<span className="player-name">{player}</span>;
   function handleEditClick(){
    setIsEditing((Editing)=>!Editing);
   }
   function handleChange(event){
        setPlayer(event.target.value)
   }
   if(isEditing){
    PlayerName=<input type="text" required value={player} onChange={handleChange}/>
   
   }
    return(
        <li>
            <span className="player">
            {PlayerName}
            <span className="player-symbol">{Symbol}</span>
            </span>
           <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
          </li>
    );
}