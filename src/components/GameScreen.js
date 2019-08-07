import React, {useState} from 'react';
import Layout from './Layout'
import Timer from './Timer';
import QuestionForm from './QuestionForm';
import GameInfo from './GameInfo';
import useGame from '../hooks/useGame';
import GameContainer from '../css_modules/game-screen.module.css';

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
        sestLastCorrectAns(correctAns);
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
    const questionDiv = <div>{first} {op} {second} = ?</div>;

    const playAgainButton = <button onClick={() => restartGame()}>Play again</button>

    return (
        <Layout>
            <div className={GameContainer.container}>
                <div className={GameContainer.containerRow}>
                    <div className={GameContainer.gameTimer}>
                        <Timer 
                            duration={DURATION} 
                            secPrecision={1} 
                            msPrecision={2} onTimeout={() => handleTimeout()}
                            continueCount={score}
                            stopped={over}
                        />
                    </div>
                </div>
                <div className={GameContainer.containerRow}>
                    <div className={GameContainer.questionArea}>
                        {over ? playAgainButton : questionDiv}
                    </div>
                </div>
                <div className={GameContainer.containerRow}>
                    <QuestionForm handleAnswer={answer => handleAnswer(answer)}/>
                </div>
                <div className={GameContainer.containerRow}>
                    <GameInfo 
                        score={score}
                        difficulty={difficulty}
                        highscore={highscore}
                        over={over}
                        correctAns={lastCorrectAns}
                        gameOverMsg={gameOverMsg}
                    />
                </div>
            </div>
        </Layout>
    );
}