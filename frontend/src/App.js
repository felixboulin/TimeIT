import React from "react";

import TimeRecorder from "./containers/TimeRecorder/TimeRecorder";
import Background from "./components/Background";


function App() {
    return (<>
        <div className="title">TimeIT</div>
        <div className="outerFrame">
            <div className="leftMenu">
                <div className="menuTitle">Menu</div>
                <div className="menuItems">
                    <div className="menuItem"><a href="/home">Home</a></div>
                    <div className="menuItem">Time Recorder</div>
                    <div className="menuItem">Clients</div>
                    <div className="menuItem">Entries</div>
                    <div className="menuItem">Reports</div>
                    <div className="menuItem">Settings</div>
                </div>
            </div>
            <div className="App">
                <TimeRecorder />
            </div >
        </div>
        <Background />
    </>);
}

export default App;