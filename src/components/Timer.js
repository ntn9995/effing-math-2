import React, {useState} from 'react';
import useTimer from '../hooks/useTimer'

export default function Timer({expiryTimestamp}) {

    const [expired, setExpired] = useState(false);

    const {
        miliSecs,
        secs,
        start,
        pause,
        restart
    } = useTimer({expiryTimestamp, onExpire:() => setExpired(true)});

    const display = expired ?
        <div>Time's Up!</div> : 
        (
            <div><span>{secs}</span>:<span>{miliSecs}</span></div>
        ); 

    return (
        <div>
            <h1>Timer</h1>
            <div style={{fontSize: '100px'}}>
                {display}
            </div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={() => {
                setExpired(false);
                let t = new Date();
                t.setSeconds(t.getSeconds() + 7);
                restart(t);
            }}>Restart</button>
        </div>
    );
}