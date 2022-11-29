import React from "react";
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";

import TimeRecorder from "./containers/TimeRecorder/TimeRecorder";
import Background from "./components/Background";
import Clients from "./containers/clients/clients";

const API_ROOT = "http://localhost:4000/";

function App() {
    return (<>
        <div className="title">TimeIT</div>
        <div className="outerFrame">
            <div className="leftMenu">
                <div className="menuItems">
                    <div className="menuItem"><Link to="/">Home</Link></div>
                    <div className="menuItem"><Link to="/time">Time Recorder</Link></div>
                    <div className="menuItem"><Link to="/clients">Clients</Link></div>
                    <div className="menuItem">Entries</div>
                    <div className="menuItem">Reports</div>
                    <div className="menuItem">Settings</div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Background />} />
                <Route path="/time" element={<TimeRecorder API_ROOT={API_ROOT} />} />
                <Route path="/clients" element={<Clients API_ROOT={API_ROOT} />} />
            </Routes>
        </div>
        <Background />
    </>);
}

export default App;