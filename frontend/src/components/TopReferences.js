import React from "react";
import './References.css';

function TopReferences() {
    return (
        <div className="References" id="TopReferences">
            <h1>Top References</h1>
            <form className="ReferenceForm">
                <div className="Selector" id="ClientSelector">
                    <label htmlFor="Client">Client</label>
                    <select name="Client">
                        <option value="Client1">Client1</option>
                        <option value="Client2">Client2</option>
                        <option value="Client3">Client3</option>
                    </select>
                    <button className="ReferenceButton" name="Add">Add</button>
                </div>
                <div className="Selector" id="ProjectSelector">
                    <label htmlFor="Project">Project</label>
                    <select name="Project">
                        <option value="Project1">Project1</option>
                        <option value="Project2">Project2</option>
                        <option value="Project3">Project3</option>
                    </select>
                    <button className="ReferenceButton" name="Add">Add</button>
                </div>
                <div className="Selector" id="TaskSelector">
                    <label htmlFor="Task">Task</label>
                    <input type="text" name="Task" />
                    <button className="ReferenceButton" name="Add">Confirm</button>
                </div>
            </form>
        </div>
    );
}

export default TopReferences;