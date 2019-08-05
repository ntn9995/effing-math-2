import React, {useState} from 'react';
import useTimer from '../hooks/useTimer'

export default function Timer(props) {
    const {title, duration, secPrecision, msPrecision, onTimeout} = props;

    let t = new Date();
    t.setSeconds(t.getSeconds() + duration);
    const expiryTimestamp = t;

    const {
        miliSecs,
        secs,
        start,
        pause,
        restart
    } = useTimer({expiryTimestamp, onExpire:() => onTimeout()});

    const formatTime = (time, precision=2) => {
        if (precision === 1){
            return time.toString();
        }
        
        if (time < 10){
            return `0${time}`;
        }
        return time.toString();
    }

    return (
        <div>
            <h1>{title || 'Timer'}</h1>
            <div>
                <span>{formatTime(secs, secPrecision)}</span>:<span>{formatTime(miliSecs, msPrecision)}</span>
            </div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={() => {
                let t = new Date();
                t.setSeconds(t.getSeconds() + duration);
                restart(t);
            }}>Restart</button>
        </div>
    );
}