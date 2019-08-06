import {useState, useEffect} from 'react';
import useQuestion from './useQuestion'

export default function useGame(settings){
    const {answer, handleWrongAns} = settings || {};

    const [over, setOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);

    const getDifficulty = () => {
        if (score < 50) return 1
        if ((score >= 50) && (score < 100)) return 2;
        return 3;
    }

    const gameOver = () => {
        setOver(true);
        let currentHighscore = localStorage.getItem('currentHighscore');
        if (currentHighscore === null){
            localStorage.setItem('currentHighscore', highscore);
        } else if (currentHighscore < highscore){
            localStorage.setItem('currentHighscore', highscore);
        }
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
            handleWrongAns();
            gameOver();
        }
    });

    const question = {first, second, op}

    useEffect(() => {
        console.log(over);
        let currentHighscore = localStorage.getItem('currentHighscore');
        if (currentHighscore !== null) setHighscore(currentHighscore);
    }, [over])

    return {over, score, highscore, difficulty, question, gameOver}
}