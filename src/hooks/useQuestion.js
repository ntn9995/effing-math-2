import {useState, useEffect} from 'react';
import {getQuestion} from '../utils/questionUtils'

const OP = ['+', '-', 'x', '/'];
const PRIMES = [2,3,5,7,11,13,17,19,21,23,29];

export default function useQuestion(settings){

    const {questionSettings: difficulty, answer} = settings || {};


    const [question, setQuestion] = useState({});

    const startQuestion = () => {
        setQuestion(getQuestion(difficulty));
    }

    const [answerStatus, setAnswerStatus] = useState(-1);
    const checkAnswer = () => {
        if ((typeof answer === 'undefined') || (answer === '')){
            setAnswerStatus(-1);
        } else {
            const {correctAns} = question;
            if (typeof correctAns === 'undefined') {
                setAnswerStatus(0);
            } else {
                setAnswerStatus(1);
            }
        }
    }

    useEffect(() => {
        startQuestion();
        checkAnswer();
    }, [settings])

    return {question, answerStatus, checkAnswer}
}