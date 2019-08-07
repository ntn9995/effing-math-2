import React from 'react';

export default function GameInfo(props){
    const {score, difficulty, highscore, over, correctAns, gameOverMsg} = props;

    const correct = over ?  `Correct Answer: ${correctAns}` : '';      
    
    const reason = over ? gameOverMsg : '';

    return (
        <div className="game-info">
            <div className="game-status">
                <div className="over">{over ? 'Game Over!' : 'Tick Tock'}</div>
                <div className="over-reason">{reason}</div>
                <div className="correct-ans">{correct}</div>
            </div>
            <div className="game-stats">
                <div className="score">Score: {score}</div>
                <div className="level">Level: {difficulty}</div>
                <div className="highscore">Highscore: {highscore}</div>
            </div>
        </div>
    );
}