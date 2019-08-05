import React, {useState} from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {

  const [over, setOver] = useState(false);

  if (over) {
    return (
      <div className="App">
        <h3>Game over!</h3>
      </div>
    );
  }

  return (
    <div className="App">
      <Timer title="Suhhhhh" duration={10} secPrecision={1} msPrecision={2} onTimeout={() => setOver(true)}/>
    </div>
  );
}

export default App;
