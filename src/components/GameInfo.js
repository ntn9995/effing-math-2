import React from 'react';

export default function GameInfo(props){
    const {score, difficulty, highscore} = props;

    return (
        <div className="game-info">
            <div className="score">Score: {score}</div>
            <div className="level">Level: {difficulty}</div>
            <div className="highscore">Highscore: {highscore}</div>
        </div>
    );
}