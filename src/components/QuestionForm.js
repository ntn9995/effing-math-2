import React, {useState} from 'react';

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
            <form onSubmit={submitAnswer} id="question-form">
                <input type="text"
                    name="answer"
                    value={answer}
                    onChange={updateAnswer}
                    required
                />
                &nbsp;
                <button type="submit">Answer</button>
            </form>
        </div>
    );
}