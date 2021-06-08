import React, {useState, useEffect} from "react";
import Display from "./components/display/display";
import Button from "./components/buttons/buttons";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import './App.css';


function App() {
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(false);
    const [dbClick, setDbClick] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        const unsubscribe = new Subject();
        interval(10)
            .pipe(takeUntil(unsubscribe))
            .subscribe(() => {
                if (start) {
                    setTime(val => val + 1);
                }});
        return () => {
            unsubscribe.next();
            unsubscribe.complete();
        }
    }, [start])

    const handleStart = () => {
        setStart(true);
    }

    const handleStop = () => {
        setTime(0);
        setStart(false);
    }

    const handleWait = () => {
        if (running) {
            let timeTaken = Date.now() - dbClick;
            setRunning(false);
            if (timeTaken <= 300) {
                setStart(false);
            }
        } else {
            setRunning(true);
            setDbClick(Date.now())
        }
    }

    const handleReset = () => {
        setTime(0);
        setStart(true);
    }

    return (
        <div className="App">
            <div className='stopwatch'>
                <div className='stopwatch-body'>
                    <h1>Stopwatch</h1>
                    <div>
                        <Display time={time}/>
                    </div>
                    <div className='buttons-wrapper'>
                        <Button type='Start' action={handleStart} />
                        <Button type='Stop' action={handleStop} />
                        <Button type='Wait' action={handleWait} />
                        <Button type='Reset' action={handleReset} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
