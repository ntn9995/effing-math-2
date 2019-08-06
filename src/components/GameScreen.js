import React, {useState} from 'react';
import Timer from './Timer';

const TIMEOUT = 1;
const WRONGANS = 2;
const DURATION = 10;

export default function GameScreen() {
    const [over, setOver] = useState(false);
    const [reason, setReason] = useState(0);

    const handleTimeout = () => {
        setOver(true);
        setReason(TIMEOUT);
    }

    const gameTimer = <Timer 
        title="TICK FUCKING TOCK!" 
        duration={DURATION} 
        secPrecision={1} 
        msPrecision={2} onTimeout={() => handleTimeout()}/>;
    
    const gameOverMsg = (<div>
        <h1>Game Over!</h1>
        <h2>{reason === 1 ? 'Time\'s Up!' : 'Wrong Answer'}!</h2>
    </div>);

    return (
        <div>
            <div className="game-clock">
                {over ? gameOverMsg : gameTimer}
            </div>
        </div>
    );
}