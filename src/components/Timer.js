import React, {useEffect} from 'react';
import useTimer from '../hooks/useTimer'

export default function Timer(props) {
    const {title, duration, secPrecision, msPrecision, onTimeout, continueCount, stopped} = props;
    let t = new Date();
    t.setSeconds(t.getSeconds() + duration);
    const expiryTimestamp = t;

    const {
        miliSecs,
        secs,
        restart,
        stop
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

    const resetTimer = () => {
        let t = new Date();
        t.setSeconds(t.getSeconds() + duration);
        restart(t);
    }

    useEffect(() => {
        if (!stopped) resetTimer();
        else {
            stop();
            console.log("stop timer")
        }
    }, [continueCount, stopped])

    return (
        <div>
            <h1>{title || 'Timer'}</h1>
            <div>
                <span>{formatTime(secs, secPrecision)}</span>:<span>{formatTime(miliSecs, msPrecision)}</span>
            </div>
        </div>
    );
}