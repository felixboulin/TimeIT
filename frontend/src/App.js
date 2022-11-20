import React from "react";

import Stopwatch from "./components/Stopwatch";
import TopReferences from "./components/TopReferences";
import BottomReferences from "./components/BottomRefences";


function App() {
    return (
        <div className="App">
            <nav>Navigation</nav>
            <main>Main
                <TopReferences />
                <Stopwatch />
                <BottomReferences />
            </main>
        </div>
    );
}

export default App;