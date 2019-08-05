import React from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {

  return (
    <div className="App">
      <Timer title="Suhhhhh" duration={10} secPrecision={1} msPrecision={2}/>
    </div>
  );
}

export default App;
