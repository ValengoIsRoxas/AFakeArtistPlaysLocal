import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import palabras from './assets/palabras_categorias.json';
import ScratchCard from './ScratchCard';



const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const players = Number(location.state?.players) || 0;
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [rol, setRol] = useState();
  const [categoria, setCategoria] = useState();
  const [palabraSecreta, setPalabraSecreta] = useState();
  const [buttonText, setButtonText] = useState("Siguiente!");
  const imitadorIndex = useRef(Math.floor(Math.random() * (players))+1);
  const [scratched, setScratched] = useState(false);

  // Función para elegir un elemento al azar
  const elegirPalabra = () => {
    const indiceAleatorio = Math.floor(Math.random() * palabras.length);
    const { palabra, categoria } = palabras[indiceAleatorio];
    // Ahora puedes usar o guardar estos valores en el estado
    console.log("Palabra elegida:", palabra);
    console.log("Categoría:", categoria);
    setPalabraSecreta(palabra);
    setCategoria(categoria);
  };


  useEffect(() => {
    if (currentPlayer === players) {
      setButtonText("Reiniciar");
    }
  }, [currentPlayer, players])

  useEffect(() =>{
    restart();
  }, []);


  const restart = () => {
    elegirPalabra();
    imitadorIndex.current = Math.floor(Math.random() * (players)) + 1;
    setCurrentPlayer(1);  
    setButtonText("Siguiente!");
  };

  
  const nextPlayer = () => {
    if (players<=currentPlayer){
        console.log("se termino el juego")
    }else{
        setCurrentPlayer(c => c + 1);
    }
  }

  useEffect(() => {
    if (!players) {
      navigate('/');    
    }
    else{
        console.log(`el jugador actual es ${currentPlayer}`);
        console.log(players)
       /*  console.log(imitadorIndex.current) */
        if (currentPlayer === imitadorIndex.current){
            setRol("Imitador");
            
        }else{
            setRol("Artista");
        }   
    }
  }, [players, navigate, currentPlayer]);

  if (!players) return null; // evita mostrar algo mientras redirige

  return (
    
    <div className='game'>
      
      <ScratchCard key={`scratch-${currentPlayer}`} onClick={() => setScratched(true)}>
        <h1>¡Hola Jugador {currentPlayer}!</h1>
        <p>Sos un {rol}</p>
        <p>La categoría es: {categoria}</p>
        {imitadorIndex.current !== currentPlayer && <p>La palabra es: {palabraSecreta}</p>}
      </ScratchCard>
      <button onClick={currentPlayer === players ? restart : nextPlayer} >
        
        {buttonText}

      </button>
    </div>
  );

};


export default Game;
