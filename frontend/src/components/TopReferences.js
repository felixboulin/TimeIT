import React, { useState, useRef } from "react";
import './References.css';
import axios from 'axios';

const API_ROOT = "http://localhost:4000/";

function TopReferences() {

    const [clientFormDisplay, setClientFormDisplay] = useState("none");
    const clientName = useRef();

    const OpenClientForm = () => {
        setClientFormDisplay("block");
    }

    const CloseClientForm = () => {
        setClientFormDisplay("none");
    }

    const addClient = () => {
        // call the backend to add a client
        let cName = clientName.current.value;
        if (cName === "") {
            alert("Please enter a name.");
        }
        else {
            axios.post(`${API_ROOT}add-client`, { "name": cName }).then(response => {
                console.log(response);
            }).catch(error => { console.log(error) });
        }
    }

    return (
        <div className="References" id="TopReferences">
            <h1>Top References</h1>
            <div className="ReferenceForm">
                <div className="Selector" id="ClientSelector">
                    <label htmlFor="Client">Client</label>
                    <select name="Client">
                        <option value="Client1">Client1</option>
                        <option value="Client2">Client2</option>
                        <option value="Client3">Client3</option>
                    </select>
                    <button className="ReferenceButton" name="Add" onClick={OpenClientForm}>Add</button>
                    <div className="form-popup" id="AddClient" style={{ display: clientFormDisplay }}>
                        <div action="/action_page.php" className="form-container">
                            <h3>Add Client</h3>
                            <label htmlFor="name"><b>Name</b></label>
                            <input type="text" ref={clientName} placeholder="Enter Client Name" name="name" required autoComplete="off" />
                            <button type="submit" className="btn" onClick={addClient}>Submit</button>
                            <button type="button" className="btn cancel" onClick={CloseClientForm}>Close</button>
                        </div>
                    </div>
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
            </div>
        </div>
    );
}

export default TopReferences;