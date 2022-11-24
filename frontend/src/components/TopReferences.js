import React, { useState, useRef, useEffect } from "react";
import './References.css';
import axios from 'axios';
// import ClientList from "./ClientList";

const API_ROOT = "http://localhost:4000/";

function TopReferences() {

    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [clientFormDisplay, setClientFormDisplay] = useState("none");
    const [projectFormDisplay, setProjectFormDisplay] = useState("none");
    const clientName = useRef();
    const projectName = useRef();
    const projectClientName = useRef();
    const [clientSelected, setClientSelected] = useState("");
    // set the below at the APP level
    // const [task, setTask] = useState("");
    // const [invoiceRef, setInvoiceRef] = useState("");


    useEffect(() => {
        getClientProjects();
    }, []);

    const handleClientSelect = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setClientSelected(e.target.value);
        getProjects(e.target.value);
    }

    const ClientList = () => {
        try {
            if (clients.length === 0) {
                return <></>;
            } else {
                return (
                    <select name="Client" value={clientSelected} onChange={handleClientSelect}>
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
                return <></>;
            } else {
                return (
                    <select name="Projects">
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
        axios.post(`${API_ROOT}add-project`, { "type": "display", "client": client }).then(response => {
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

    return (
        <div className="References" id="TopReferences">
            <h1>TimeIT</h1>
            <p>Configure clients and projects and start tracking your time and generate your invoices</p>
            <div className="ReferenceForm">
                <div className="Selector selectParam" id="ClientSelector">
                    <label htmlFor="Client">Client</label>
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
                    <label htmlFor="Project">Project</label>
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
    );
}

export default TopReferences;