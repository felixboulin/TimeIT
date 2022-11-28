import React, { useState } from "react";
import 'material-symbols';
import './Stopwatch.css';

function Stopwatch(props) {
    const { time, StartTimer, PauseTimer, Cancel } = props;

    let hour = Math.floor(time / 3600);
    let minute = Math.floor((time - hour * 3600) / 60);
    let second = time - hour * 3600 - minute * 60;

    return (
        <div className="Stopwatch">
            {/* <h1>Stopwatch</h1> */}
            <div className="Circle">
                <div className="Time">{hour}:{minute}:{second}</div>
                <div className="Buttons">

                    <button className="WatchButton" name="Start" onClick={StartTimer}><span className="material-symbols-outlined icon">
                        play_circle
                    </span></button>
                    <button className="WatchButton" name="Pause" onClick={PauseTimer}><span className="material-symbols-outlined icon">
                        pause
                    </span></button>
                    <button className="WatchButton" name="Cancel" id="stopButton" onClick={Cancel}><span className="material-symbols-outlined icon">
                        stop_circle
                    </span></button>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;