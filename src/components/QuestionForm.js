import React, {useState} from 'react';
import FormContainer from '../css_modules/question-form.module.css';

export default function QuestionForm(props) {

    const {handleAnswer} = props; 
    const [answer, setAnswer] = useState('');

    const submitAnswer = e => {
        e.preventDefault();
        handleAnswer(parseInt(answer));
        setAnswer('');
        document.getElementById("question-form").reset();
    }

    const updateAnswer = e => {
        setAnswer(e.target.value);
    }

    return(
        <div>
            <form className={FormContainer.formContainer} onSubmit={submitAnswer} id="question-form">
                <div className={FormContainer.formItem}>
                    <input type="text"
                        name="answer"
                        value={answer}
                        onChange={updateAnswer}
                        required
                    />
                </div>
                <div className={FormContainer.formItem}>
                    <button type="submit">Answer</button>
                </div>
                
            </form>
        </div>
    );
}