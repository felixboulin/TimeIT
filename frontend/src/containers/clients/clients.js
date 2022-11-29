import React, {
    useState,
    useEffect,
} from "react";
import axios from "axios";

import "./clients.css";

import ClientTable from "./components/ClientTable";
import ManageForm from "./components/ManageForm";

export default function Clients(props) {
    const { API_ROOT } = props;
    const [clients, setClients] = useState(false);
    const [clientSelected, setClientSelected] = useState("");
    const [showManageForm, setShowManageForm] = useState(false);
    const [manageFormType, setManageFormType] = useState("");

    const getClients = () => {
        axios.get(`${API_ROOT}manage-clients`).then(response => {
            setClients(JSON.parse(response.data));
        }).catch(error => { console.log(error) });
    };

    useEffect(() => {
        getClients();
    }, []);

    const popManageForm = (e, clients, clientSelected) => {
        e.preventDefault();
        if (e.target.value === 'edit') {
            let client = clients.cl.find(client => client.id === parseInt(clientSelected));
            if (!client) {
                alert("Please select a client to edit");
            } else {
                setManageFormType('edit');
                setShowManageForm(true);
            };
        } else if (e.target.value === 'add-new') {
            setManageFormType('add-new');
            setShowManageForm(true);

            console.log(e.target.value)
            console.log(clients, clientSelected);
        };
    }

    const handleManageFormSubmit = (e, client, clientNameRef, AddressRef, CityRef, StateRef, ZipRef, ABNRef, OfficialNameRef, invoiced_entityRef) => {
        e.preventDefault();
        let id = null
        if (e.target.value === 'SubmitEdit') {
            id = parseInt(client.id);
        } else if (e.target.value === 'SubmitNew') {
            id = -1;
        };
        axios.post(`${API_ROOT}manage-clients`, {
            "id": id,
            "name": clientNameRef,
            "address": AddressRef,
            "city": CityRef,
            "state": StateRef,
            "zip": ZipRef,
            "ABN": ABNRef,
            "OfficialName": OfficialNameRef,
            "invoiced_entity": invoiced_entityRef
        }).then(response => {
            console.log(response);
            getClients();
            setShowManageForm(false);
        }).catch(error => { console.log(error) });
    };

    const handleManageFormCancel = (e) => {
        e.preventDefault();
        setShowManageForm(false);
        setManageFormType("");
    }

    const handleClientSelected = (event) => {
        setClientSelected(event.target.value);
    };

    return (<div>
        <form>
            <button type="button" value={'edit'} onClick={(e) => popManageForm(e, clients, clientSelected)}>Edit</button>
            {/* <button type="button" value={'delete'} onClick={() => console.log('delete')}>Delete</button> */}
            <button type="button" value={'add-new'} onClick={(e) => popManageForm(e, clients, clientSelected)}>Add New</button>
        </form>
        {showManageForm
            ? <ManageForm
                clients={clients}
                clientSelected={clientSelected}
                manageFormType={manageFormType}
                handleManageFormSubmit={handleManageFormSubmit}
                handleManageFormCancel={handleManageFormCancel}
            />
            : <></>}
        {clients
            ? <ClientTable
                clients={clients}
                handleClientSelected={handleClientSelected}
            />
            : <>loading</>}
    </div>);
};