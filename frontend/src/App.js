import React from "react";

import TimeRecorder from "./containers/TimeRecorder/TimeRecorder";
import Background from "./components/Background";


function App() {
    return (
        <div className="App">
            {/* <nav>Navigation</nav>
            <main>Main */}
            <div className="title">TimeIT</div>
            {/* <p>Configure clients and projects and start tracking your time and generate your invoices</p> */}
            <Background />
            <TimeRecorder />
            {/* </main> */}
        </div >
    );
}

export default App;