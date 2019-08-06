import {useState, useEffect} from 'react';
import {getQuestion} from '../utils/questionUtils'

export default function useQuestion(settings){

    const {difficulty, answer, onCorrectAns, onWrongAns} = settings || {};


    const [question, setQuestion] = useState({});

    const startQuestion = () => {
        setQuestion(getQuestion(difficulty));
    }

    const checkAnswer = () => {
        if ((typeof answer === 'undefined') || (answer === '')){
            return;
        } else {
            const {correctAns} = question;
            if (typeof correctAns === 'undefined') {
                return;
            } else {
                if (correctAns === answer) onCorrectAns();
                else onWrongAns();
            }
        }
    }

    useEffect(() => {
        startQuestion();
        checkAnswer();
    }, [answer])

    const {first, second, op, correctAns} = question;

    return {first, second, op, correctAns, checkAnswer};
}