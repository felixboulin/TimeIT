import React, { useState, useRef, useEffect } from "react";
import './References.css';
import axios from 'axios';
import Stopwatch from "./Stopwatch";

const API_ROOT = "http://localhost:4000/";

function References() {

    // Legacy, Top Reference State variables
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [clientFormDisplay, setClientFormDisplay] = useState("none");
    const [projectFormDisplay, setProjectFormDisplay] = useState("none");
    const clientName = useRef();
    const projectName = useRef();
    const projectClientName = useRef();
    const [clientSelected, setClientSelected] = useState("");
    const [projectSelected, setProjectSelected] = useState("");

    // Legacy, Bottom Reference State variables
    const task = useRef();
    const invoiceRef = useRef();
    const comment = useRef();

    // Legacy, Stopwatch State variables
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    // Functions related to Stopwatch operations
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
            setIsRunning(false);
            setTime(0);
        } else {
            return;
        }
    }


    // Functions related to Legacy, Top Reference operations
    useEffect(() => {
        getClientProjects();
    }, []);

    const handleClientSelect = (e) => {
        e.preventDefault();
        setClientSelected(e.target.value);
        getProjects(e.target.value);
    }

    const handleProjectSelect = (e) => {
        e.preventDefault();
        setProjectSelected(e.target.value);
    }

    const ClientList = () => {
        try {
            if (clients.length === 0) {
                return <></>;
            } else {
                return (
                    <select name="Client" value={clientSelected} onChange={handleClientSelect}>
                        <option value={'select a client'}>Select / Add Client</option>
                        {clients.map((client, i) => (
                            <option value={client} key={i} >{client}</option>))}
                    </select>
                )
            }
        } catch (error) {
            console.log(error)

        };
    }

    const ProjectList = () => {
        try {
            if (projects.length === 0) {
                return <><select name="Projects" value={projectSelected} onChange={handleProjectSelect} >
                    <option value={'select a project'}>Select / Add Project</option></select></>;
            } else {
                return (
                    <select name="Projects" value={projectSelected} onChange={handleProjectSelect} >
                        <option value={'select a project'}>Select / Add Project</option>
                        {projects.map((project, i) => (
                            <option value={project} key={i}>{project}</option>))}
                    </select>
                )
            }
        } catch (error) {
            console.log(error)

        };
    }

    const ManageForms = (event) => {
        event.preventDefault();
        switch (event.target.id) {
            case "open-client":
                setClientFormDisplay("block");
                break;
            case "open-project":
                setProjectFormDisplay("block");
                break;
            case "close-client":
                setClientFormDisplay("none");
                break;
            case "close-project":
                setProjectFormDisplay("none");
                break;
        };
    };

    const getClients = () => {
        axios.get(`${API_ROOT}add-client`).then(response => {
            setClients(response.data);
        }).catch(error => { console.log(error) });
    }

    const getProjects = (client) => {
        axios.get(`${API_ROOT}add-project?client=${client}`).then(response => {
            setProjects(response.data);
        }).catch(error => { console.log(error) });
    }

    const getClientProjects = () => {
        axios.get(`${API_ROOT}add-client`)
            .then(response => {
                setClients(response.data);
                return response
            })
            .then(response => {
                console.log(response);
                getProjects(response.data);
            })
            .catch(error => { console.log(error) });
    }

    const addClient = () => {
        // call the backend to add a client
        let cName = clientName.current.value;
        if (cName === "") {
            alert("Please enter a name.");
        }
        else {
            axios.post(`${API_ROOT}add-client`, { "name": cName }).then(response => {
                getClients();
                ManageForms('close-client');
            }).catch(error => { console.log(error) });
        }
    }

    const addProject = () => {
        // call the backend to add a project
        let pName = projectName.current.value;
        let pcName = projectClientName.current.value;
        if (pName === "" || pcName === "") {
            alert("Please enter a name.");
        }
        else {
            axios.post(`${API_ROOT}add-project`, { "name": pName, "client": pcName }).then(response => {
                ManageForms('close-project');
                getProjects(pcName);
            }).catch(error => { console.log(error) });
        }
    }

    // Submit the time entry to the backend
    const SubmitEntry = () => {
        let t = task.current.value;
        let i = invoiceRef.current.value;
        let c = comment.current.value;
        let p = projectSelected;
        let cl = clientSelected;
        let time_submit = formatTime(time);
        if (t === "" || cl === "" || p === "") {
            alert("You must enter a Client, Project and a Task.");
        }
        else {
            let go = window.confirm("The following entry will be added to the database:\nClient: " + cl + "\nProject: " + p + "\nTask: " + t + "\nTime: " + time_submit + "\nInvoice Ref: " + i + "\nComment: " + c + "\nIs this correct?");
            if (go) {
                axios.post(`${API_ROOT}add-entry`, { "task": t, "invoiceRef": i, "comment": c, "client": cl, "project": p, "time": time }).then(response => {
                    console.log(response);
                }).catch(error => { console.log(error) });
            }
            else {
                console.log("Entry not added");
            }
        }
    };

    const formatTime = (time) => {
        let hour = Math.floor(time / 3600);
        let minute = Math.floor((time - hour * 3600) / 60);
        let second = time - hour * 3600 - minute * 60;
        return (`${hour}:${minute}:${second}`)
    }

    return (<>
        <div className="References" id="TopReferences">
            <div className="ReferenceForm">
                <div className="Selector selectParam" id="ClientSelector">
                    {/* <label htmlFor="Client">Client</label> */}
                    <ClientList clients={clients} />
                    <button className="ReferenceButton" type="button" name="Add" id="open-client" onClick={ManageForms}>Add</button>
                    <div className="form-popup" id="AddClient" style={{ display: clientFormDisplay }}>
                        <div className="form-container">
                            <h3>Add Client</h3>
                            <label htmlFor="name"><b>Name</b></label>
                            <input type="text" ref={clientName} placeholder="Enter Client Name" name="name" required autoComplete="off" />
                            <button type="submit" className="btn" onClick={addClient}>Submit</button>
                            <button type="button" className="btn cancel" id="close-client" onClick={ManageForms}>Close</button>
                        </div>
                    </div>
                </div>
                <div className="Selector selectParam" id="ProjectSelector">
                    {/* <label htmlFor="Project">Project</label> */}
                    <ProjectList projects={projects} />
                    <button className="ReferenceButton" type="button" name="Add" id="open-project" onClick={ManageForms}>Add</button>
                </div>
                {/* Form Pop Ups below to Insert Client and Project */}
                <div className="form-popup" id="AddClient" style={{ display: projectFormDisplay }}>
                    <div className="form-container">
                        <h3>Add Project</h3>
                        <label htmlFor="name"><b>Project Name</b></label>
                        <input type="text" ref={projectName} placeholder="Enter Project Name" name="name" required autoComplete="off" />
                        <label htmlFor="name"><b>Client</b></label>
                        <input type="text" ref={projectClientName} placeholder="Enter Client for which the project is for" name="name" required autoComplete="off" />
                        <button type="submit" className="btn" onClick={addProject}>Submit</button>
                        <button type="button" className="btn cancel" id="close-project" onClick={ManageForms}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        <Stopwatch time={time} StartTimer={StartTimer} PauseTimer={PauseTimer} Cancel={Cancel} />
        <div className="References" id="BottomReferences">
            <h2>Time Entry Details</h2>
            <div className="Selector selectText" id="TaskSelector">
                <label htmlFor="Task">Task</label>
                <input type="text" name="Task" ref={task} />
            </div>

            <div className="Selector selectText" id="InvoiceReference">
                <label htmlFor="InvoiceReference">Invoice Ref.</label>
                <input type="text" name="InvoiceReference" ref={invoiceRef} />
            </div>

            <div className="Selector selectText" id="Comments">
                <div className="childLabel">
                    <label htmlFor="CommentS">Comments</label>
                </div>
                <textarea name="CommentS" className="longText " ref={comment} ></textarea>
            </div>

        </div>
        <button className="SubmitButton" name="SubmitEntry" onClick={SubmitEntry}>Submit Time Entry</button>
    </>);
}

export default References;