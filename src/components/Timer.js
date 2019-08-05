import React, {useState} from 'react';
import useTimer from '../hooks/useTimer'

export default function Timer(props) {

    const [expired, setExpired] = useState(false);

    const {title, duration, secPrecision, msPrecision} = props;

    let t = new Date();
    t.setSeconds(t.getSeconds() + duration);
    const expiryTimestamp = t;

    const {
        miliSecs,
        secs,
        start,
        pause,
        restart
    } = useTimer({expiryTimestamp, onExpire:() => setExpired(true)});

    const formatTime = (time, precision=2) => {
        if (precision === 1){
            return time.toString();
        }
        
        if (time < 10){
            return `0${time}`;
        }
        return time.toString();
    }

    const display = expired ?
        <div>Time's Up!</div> : 
        (
            <div><span>{formatTime(secs, secPrecision)}</span>:<span>{formatTime(miliSecs, msPrecision)}</span></div>
        ); 

    return (
        <div>
            <h1>{title || 'Timer'}</h1>
            <div style={{fontSize: '100px'}}>
                {display}
            </div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={() => {
                setExpired(false);
                let t = new Date();
                t.setSeconds(t.getSeconds() + duration);
                restart(t);
            }}>Restart</button>
        </div>
    );
}