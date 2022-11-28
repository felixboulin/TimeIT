import React, { useState, useRef, useEffect } from "react";
import './TimeRecorder.css';
import axios from 'axios';

import Stopwatch from "./components/Stopwatch";
import TopRefs from "./components/TopRefs";
import BottomRefs from "./components/BottomRefs";

const API_ROOT = "http://localhost:4000/";

function TimeRecorder() {

    // TopRef State variables
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [clientSelected, setClientSelected] = useState("");
    const [projectSelected, setProjectSelected] = useState("");

    // BottomRef State variables
    const task = useRef();
    const invoiceRef = useRef();
    const comment = useRef();

    // Stopwatch State variables
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


    // Functions related to TopRefs operations
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

    const getProjects = (client) => {
        axios.get(`${API_ROOT}add-project?client=${client}`).then(response => {
            setProjects(response.data);
        }).catch(error => { console.log(error) });
    }

    const getClientProjects = () => {
        // =getClients();
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
        <TopRefs client={clients} projects={projects} API_ROOT={API_ROOT} ClientList={ClientList} ProjectList={ProjectList} />
        <Stopwatch time={time} StartTimer={StartTimer} PauseTimer={PauseTimer} Cancel={Cancel} />
        <BottomRefs task={task} invoiceRef={invoiceRef} comment={comment} />
        <button className="SubmitButton" name="SubmitEntry" onClick={SubmitEntry}>Submit Time Entry</button>
    </>);
}

export default TimeRecorder;