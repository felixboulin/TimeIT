import React, {
    useState,
    useEffect,
} from "react";
import axios from "axios";


import EntryTable from "./components/EntryTable";
import ManageForm from "./components/ManageForm";

export default function Entries(props) {
    const { API_ROOT } = props;

    const [entries, setEntries] = useState(false);
    const [entrySelected, setEntrySelected] = useState("");
    const [showManageForm, setShowManageForm] = useState(false);
    const [manageFormType, setManageFormType] = useState("");

    // Relevant for add new entry
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [clientSelected, setClientSelected] = useState("");
    const [projectSelected, setProjectSelected] = useState("");

    useEffect(() => {
        getEntries();
        getClientProjects();
    }, []);


    // Relevant for add new entry
    const handleClientSelect = (e) => {
        e.preventDefault();
        setClientSelected(e.target.value);
        getProjects(e.target.value);
    }

    // Relevant for add new entry
    const handleProjectSelect = (e) => {
        e.preventDefault();
        setProjectSelected(e.target.value);
    }

    const getEntries = () => {
        axios.get(`${API_ROOT}manage-entries`).then(response => {
            setEntries(JSON.parse(response.data));
        }).catch(error => { console.log(error) });
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

    const getClients = () => {
        // =getClients();
        axios.get(`${API_ROOT}add-client`)
            .then(response => {
                setClients(response.data);
                return response
            }).catch(error => { console.log(error) });
    }

    const popManageForm = (e, entries, entrySelected) => {
        e.preventDefault();
        if (e.target.value === 'edit') {
            let entry = entries.en.find(entry => entry.id === parseInt(entrySelected));
            if (!entry) {
                alert("Please select an entry to edit");
            } else {
                setManageFormType('edit');
                setShowManageForm(true);
            };
        } else if (e.target.value === 'add-new') {
            setManageFormType('add-new');
            setShowManageForm(true);
        };
    };

    const handleManageFormSubmit = (e, entry, entryDateRef, hoursRef, taskRef, invoiceReferenceRef, commentsRef, invoicedRef) => {
        e.preventDefault();
        let id = null
        let project_id = null
        const postEntry = () => {
            axios.post(`${API_ROOT}manage-entries`, {
                "id": id,
                "entry_date": entryDateRef,
                "hours": hoursRef,
                "task": taskRef,
                "invoice_reference": invoiceReferenceRef,
                "comments": commentsRef,
                "invoiced": invoiced,
                "project_id": project_id
            }).then(response => {
                console.log(response);
                getEntries();
                setShowManageForm(false);
            }).catch(error => { console.log(error) });
        }
        let invoiced = invoicedRef === true ? 1 : 0;
        if (e.target.value === 'Submit Edit') {
            id = parseInt(entry.id);
        } else if (e.target.value === 'Submit New') {
            if (projectSelected === "select a project" || projectSelected === "") {
                alert("Please select a project");
                return;
            }
            id = -1;
            // axios get project which value has been selected in the select on top of the add new form and retrieve project_id
            axios.get(`${API_ROOT}add-project?project=${projectSelected}&type=retrieveID`).then(response => {
                project_id = parseInt(response.data);
                postEntry();
                return
            }).catch(error => { console.log(error) });
        };

        postEntry();


    }

    const handleManageFormCancel = (e) => {
        e.preventDefault();
        setShowManageForm(false);
    }

    const handleEntrySelected = (e) => {
        setEntrySelected(e.target.value);
    };

    return (<div>
        <form>
            <button value="add-new" onClick={(e) => popManageForm(e, entries, entrySelected)}>Add New</button>
            <button value="edit" onClick={(e) => popManageForm(e, entries, entrySelected)}>Edit</button>
        </form>
        {showManageForm ? <ManageForm
            entries={entries}
            entrySelected={entrySelected}
            manageFormType={manageFormType}
            handleManageFormSubmit={handleManageFormSubmit}
            handleManageFormCancel={handleManageFormCancel}
            clientSelected={clientSelected}
            projectSelected={projectSelected}
            handleClientSelect={handleClientSelect}
            handleProjectSelect={handleProjectSelect}
            clients={clients}
            projects={projects}
        /> : null}
        {entries ? <EntryTable
            entries={entries}
            handleEntrySelected={handleEntrySelected}
        /> : null}
    </div>)

}