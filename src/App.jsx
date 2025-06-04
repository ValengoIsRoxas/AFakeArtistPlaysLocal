import PlayerSelection from "./PlayerSelection"
import Game from "./Game";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <MainContent/>
    </Router>
  )
}

function MainContent(){
  return(
    <main>
      <Routes>
        <Route path="/" 
        element={<PlayerSelection/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </main>
  )
}

export default App
