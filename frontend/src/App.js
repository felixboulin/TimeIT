import React from "react";

import Stopwatch from "./components/Stopwatch";
import TopReferences from "./components/TopReferences";
import BottomReferences from "./components/BottomRefences";
import Background from "./components/Background";


function App() {
    return (
        <div className="App">
            {/* <nav>Navigation</nav>
            <main>Main */}
            <Background />
            <TopReferences />
            <Stopwatch />
            <BottomReferences />
            <button className="SubmitButton" name="Submit">Submit</button>
            {/* </main> */}
        </div >
    );
}

export default App;