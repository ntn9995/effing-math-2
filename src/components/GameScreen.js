import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import QuestionForm from './QuestionForm';
import GameInfo from './GameInfo';
import useQuestion from '../hooks/useQuestion';
import useGame from '../hooks/useGame';

const TIMEOUT = 1;
const WRONGANS = 2;
const DURATION = 10;

const EMPTYDIV = <div></div>;

export default function GameScreen() {
    const [reason, setReason] = useState(0);
    const [answer, setAnswer] = useState('');

    const {
        over,
        score,
        highscore,
        difficulty,
        question,
        gameOver
    } = useGame({
        answer,
        handleWrongAns: () => {setReason(WRONGANS)}
    });

    const handleTimeout = () => {
        setReason(TIMEOUT);
        gameOver();
    }

    const handleAnswer = a => {
        setAnswer(a);
    }

    const gameTimer = (<Timer 
        title="TICK FUCKING TOCK!" 
        duration={DURATION} 
        secPrecision={1} 
        msPrecision={2} onTimeout={() => handleTimeout()}
        continueCount={score}
    />);
    
    const gameOverMsg = (<div>
        <h1>Game Over!</h1>
        <h2>{reason === 1 ? 'Time\'s Up!' : 'Wrong Answer'}!</h2>
    </div>);

    const {first, second, op} = question;

    const questionDiv = (<div>
         <h3>{first} {op} {second} = ?</h3>
    </div>);

    return (
        <div>
            <div className="game-clock">
                {over ? gameOverMsg : gameTimer}
            </div>
            <div>
                {over ? EMPTYDIV : questionDiv}
            </div>
            <QuestionForm handleAnswer={answer => handleAnswer(answer)}/>
            <GameInfo score={score} difficulty={difficulty} highscore={highscore}/>
        </div>
    );
}