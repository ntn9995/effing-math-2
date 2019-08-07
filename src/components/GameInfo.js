import React from 'react';
import GameInfoContainer from '../css_modules/game-info.module.css'; 

export default function GameInfo(props){
    const {score, difficulty, highscore, over, correctAns, gameOverMsg} = props;

    const correct = over ?  `Correct Answer: ${correctAns}` : '';      
    
    const reason = over ? gameOverMsg : '';

    return (
        <div className={GameInfoContainer.container}>
            <div className={GameInfoContainer.item}>
                <div><h3>{over ? 'Game Over!' : 'Tick Tock'}</h3></div>
                <div><h3>{reason}</h3></div>
                <div>{correct}</div>
            </div>
            <div className={GameInfoContainer.item}>
                <div className={GameInfoContainer.gameStatContainer}>
                    <div className={GameInfoContainer.statItem}>Score: {score}</div>
                    <div className={GameInfoContainer.statItem}>Level: {difficulty}</div>
                    <div className={GameInfoContainer.statItem}>Highscore: {highscore}</div>
                </div>
            </div>
        </div>
    );
}