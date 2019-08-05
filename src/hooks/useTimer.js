import { useState, useEffect, useRef } from 'react';

export default function useTimer(settings) {
    const { expiryTimestamp: expiry, onExpire } = settings || {}
    const  [expiryTimestamp, setExpiryTimestamp ] = useState(expiry);
    
    const [count, setCount] = useState(0);
    function subtractCount(){
        setCount(prevCount => {
            if (prevCount > 0){
                console.log(prevCount)
                setSecs(Math.floor(prevCount / 100));
                setMicrosecs(prevCount % 100);
                return prevCount - 1;
            }
            reset();
            isValidOnExpire(onExpire) && onExpire();
            return 0;
        })
    }

    const [miliSecs, setMicrosecs] = useState(0);
    const [secs, setSecs] = useState(0);

    const intervalRef = useRef();

    function start(){
        if (isValidExpiryTimestamp(expiryTimestamp) && !intervalRef.current) {
            setDuration();
            intervalRef.current = setInterval(() => subtractCount(), 10);
        }
    }

    function pause(){
        if(intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    }

    function reset(){
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    }

    function resume() {
        if(isValidExpiryTimestamp(expiryTimestamp) && !intervalRef.current){
            intervalRef.current = setInterval(() => subtractCount(), 10);
        }
    }

    function restart(newExpiryTimeStamp){
        reset();
        setExpiryTimestamp(newExpiryTimeStamp);
    }

    function setDuration() {
        let now = new Date().getTime();
        let dist = Math.round((expiryTimestamp - now) / 10);
        console.log(dist);

        let secs = Math.round(dist / (100));
        let microSecs = dist % 100;

        if (secs < 0) {
            reset();
            isValidOnExpire(onExpire) && onExpire();
        } else {
            setCount(dist);
            setSecs(secs);
            setMicrosecs(microSecs);
        }
    }

    useEffect(() => {
        start();
        return reset;
    }, [expiryTimestamp]);

    function isValidExpiryTimestamp(expiryTimestamp) {
        const valid = (new Date(expiryTimestamp)).getTime() > 0;
        if (!valid){
            console.warn('use-timer: {useTimer} Invalid expiry', expiryTimestamp);
        }
        return valid;
    }

    function isValidOnExpire(onExpire) {
        const valid = onExpire && typeof onExpire === 'function';
        if (onExpire && !valid) {
            console.warn('use-timer: {useTimer} Invalid onExpire', onExpire);
        }

        return valid;
    }

    return {miliSecs, secs, start, pause, resume, restart};
}