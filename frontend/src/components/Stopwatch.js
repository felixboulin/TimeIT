import React, { useState } from "react";
import './Stopwatch.css';

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const UpdateCounter = () => {
        setTime(time => time + 1);
    }

    const StartTimer = () => {
        if (isRunning) {
            return;
        } else {
            setTimer(setInterval(UpdateCounter, 1000))
            setIsRunning(true);
        }
    }

    const PauseTimer = () => {
        if (isRunning) {
            clearInterval(timer);
            setIsRunning(false);
        } else {
            return;
        }
    }

    const Cancel = () => {
        let isExecuter = window.confirm("Are you sure you want to cancel? You will lose all time data and won't be able to retrieve it.");
        if (isExecuter) {
            clearInterval(timer);
            setTime(0);
        } else {
            return;
        }
    }


    let hour = Math.floor(time / 3600);
    let minute = Math.floor((time - hour * 3600) / 60);
    let second = time - hour * 3600 - minute * 60;

    return (
        <div className="Stopwatch">
            <h1>Stopwatch</h1>
            <div className="Circle">
                <div className="Time">{hour}:{minute}:{second}</div>
                <div className="Buttons">
                    <button className="WatchButton" name="Start" onClick={StartTimer}>Start</button>
                    <button className="WatchButton" name="Pause" onClick={PauseTimer}>Pause</button>
                    <button className="WatchButton" name="Cancel" onClick={Cancel}>Cancel</button>
                    <button className="WatchButton" name="Submit">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;