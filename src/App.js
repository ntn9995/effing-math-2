import React from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {

  let t = new Date();
  t.setSeconds(t.getSeconds() + 7);

  return (
    <div className="App">
      <Timer expiryTimestamp={t} onExpire/>
    </div>
  );
}

export default App;
