import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import QuestionForm from './QuestionForm';
import GameInfo from './GameInfo';
import useGame from '../hooks/useGame';

const TIMEOUT = 1;
const WRONGANS = 2;
const DURATION = 10;

export default function GameScreen() {
    const [reason, setReason] = useState(0);
    const [answer, setAnswer] = useState('');
    const [lastCorrectAns, sestLastCorrectAns] = useState('');

    const {
        over,
        score,
        correctAns,
        highscore,
        difficulty,
        question,
        gameOver,
        restartGame
    } = useGame({
        answer,
        handleWrongAns: () => {handleWrongAnswer()}
    });

    const handleTimeout = () => {
        setReason(TIMEOUT);
        gameOver();
    }

    const handleWrongAnswer = () => {
        setReason(WRONGANS);
        sestLastCorrectAns(correctAns);
        gameOver();
    }

    const handleAnswer = a => {
        setAnswer(a);
    }
    const gameOverMsg = reason === 1 ? 'Time\'s Up!' : 'Wrong Answer';
    
    const {first, second, op} = question;
    const questionDiv = (<div>
         <h3>{first} {op} {second} = ?</h3>
    </div>);

    const playAgainButton = <button onClick={() => restartGame()}>Play again</button>

    return (
        <div>
            <div className="game-clock">
            <Timer 
                title="EFFING MATH" 
                duration={DURATION} 
                secPrecision={1} 
                msPrecision={2} onTimeout={() => handleTimeout()}
                continueCount={score}
                stopped={over}
            />
            </div>
            <div>
                {over ? playAgainButton : questionDiv}
            </div>
            <QuestionForm handleAnswer={answer => handleAnswer(answer)}/>
            <GameInfo 
                score={score}
                difficulty={difficulty}
                highscore={highscore}
                over={over}
                correctAns={lastCorrectAns}
                gameOverMsg={gameOverMsg}
            />
        </div>
    );
}