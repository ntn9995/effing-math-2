import React from 'react';

export default function GameInfo(props){
    const {score, difficulty, highscore, correctAns} = props;

    const correct = correctAns === '' ? 
        correctAns : 
        `Correct Answer: ${correctAns}`;

    return (
        <div className="game-info">
            <div className="score">Score: {score}</div>
            <div className="level">Level: {difficulty}</div>
            <div className="highscore">Highscore: {highscore}</div>
            <div className="correct-ans">{correct}</div>
        </div>
    );
}