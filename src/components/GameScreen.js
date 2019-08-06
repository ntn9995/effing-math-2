import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import QuestionForm from './QuestionForm'
import GameInfo from './GameInfo'
import useQuestion from '../hooks/useQuestion'

const TIMEOUT = 1;
const WRONGANS = 2;
const DURATION = 10;

const EMPTYDIV = <div></div>;

export default function GameScreen() {

    const [over, setOver] = useState(false);
    const [reason, setReason] = useState(0);
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [answer, setAnswer] = useState('');

    const getDifficulty = () => {
        if (score < 50) return 1
        if ((score >= 50) && (score < 100)) return 2;
        return 3;
    }

    const gameOver = () => {
        setOver(true);
        let currentHighscore = localStorage.getItem('currentHighscore');
        if (currentHighscore !== null && highscore > currentHighscore){
            localStorage.setItem('currentHighscore', highscore);
        };
    };

    const incrementScore = () => {
        setScore(s => {
            if (highscore < (s + 10)) setHighscore(s + 10);
            return s + 10;
        });
    }

    const difficulty = getDifficulty(score);
    const {
        first,
        second,
        op,
    } = useQuestion({
        difficulty,
        answer,
        onCorrectAns: () =>{
            incrementScore();
        },
        onWrongAns: () => {
            setReason(WRONGANS);
            gameOver();
        }
    });

    const handleTimeout = () => {
        setReason(TIMEOUT);
        gameOver(reason);
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

    const question = (<div>
         <h3>{first} {op} {second} = ?</h3>
    </div>);
    
    useEffect(() => {
        let currentHighscore = localStorage.getItem('currentHighscore');
        if (currentHighscore !== null) setHighscore(currentHighscore);
    }, [over])

    return (
        <div>
            <div className="game-clock">
                {over ? gameOverMsg : gameTimer}
            </div>
            <div>
                {over ? EMPTYDIV : question}
            </div>
            <QuestionForm handleAnswer={answer => handleAnswer(answer)}/>
            <GameInfo score={score} difficulty={difficulty} highscore={highscore}/>
        </div>
    );
}