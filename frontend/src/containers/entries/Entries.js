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

    const getEntries = () => {
        axios.get(`${API_ROOT}manage-entries`).then(response => {
            setEntries(JSON.parse(response.data));
        }).catch(error => { console.log(error) });
    }

    useEffect(() => {
        getEntries();
    }, []);

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
        console.log(invoicedRef)
        let invoiced = invoicedRef === true ? 1 : 0;
        if (e.target.value === 'Submit Edit') {
            id = parseInt(entry.id);
        } else if (e.target.value === 'Submit New') {
            id = -1;
        };

        axios.post(`${API_ROOT}manage-entries`, {
            "id": id,
            "entry_date": entryDateRef,
            "hours": hoursRef,
            "task": taskRef,
            "invoice_reference": invoiceReferenceRef,
            "comments": commentsRef,
            "invoiced": invoiced,
        }).then(response => {
            console.log(response);
            getEntries();
            setShowManageForm(false);
        }).catch(error => { console.log(error) });
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
        /> : null}
        {entries ? <EntryTable
            entries={entries}
            handleEntrySelected={handleEntrySelected}
        /> : null}
    </div>)

}