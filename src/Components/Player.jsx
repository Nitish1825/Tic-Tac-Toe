import { useState } from "react";
export default function Player({InitialName,Symbol,isActive,onChangeName}){
    const[isEditing,setIsEditing]=useState(false);
    const[player,setPlayer]=useState(InitialName);
   let PlayerName=<span className="player-name">{player}</span>;
   function handleEditClick(){
    setIsEditing((Editing)=>!Editing);
    if(isEditing){
        onChangeName(Symbol,player);
    }
   }
   function handleChange(event){
        setPlayer(event.target.value)
   }
   if(isEditing){
    PlayerName=<input type="text" required value={player} onChange={handleChange}/>
   
   }
    return(
        <li className={isActive? 'active' : undefined}>
            <span className="player">
            {PlayerName}
            <span className="player-symbol">{Symbol}</span>
            </span>
           <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
          </li>
    );
}