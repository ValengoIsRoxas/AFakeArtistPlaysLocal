import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerSelection = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(3);


  const start = () => {
    if (players >= 3) {
      console.log("Funcionó bien");
      navigate('/game', { state: { players } }); // ← pasa el valor por state
    } else {
      alert("Error, mínimo 3 jugadores");
    }
  };  

  const handleChange = (e) => {
    setPlayers(e.target.value);
    console.log(`son ${players} jugadores`)
  };


    return (
      <span>
            <div className='titulo'>
              ¿Cuantos artistas serán?
            </div>
            <input id="selector" type='number' value={players} onChange={handleChange}/>
            <button className='Comenzar' onClick={() => start()}>Comenzar</button>
      </span>
    );
};

export default PlayerSelection;