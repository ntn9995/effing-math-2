import React from 'react';

export default function GameInfo(props){
    const {score, difficulty} = props;

    return (
        <div className="game-info">
            <div className="score">Score: {score}</div>
            <div className="level">Level: {difficulty}</div>
        </div>
    );
}