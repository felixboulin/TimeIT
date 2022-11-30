import React, { useRef } from "react";

export default function ManageForm(props) {
    const { clients, clientSelected, manageFormType, handleManageFormCancel, handleManageFormSubmit } = props;

    const clientNameRef = useRef();
    const AddressRef = useRef();
    const CityRef = useRef();
    const StateRef = useRef();
    const ZipRef = useRef();
    const ABNRef = useRef();
    const OfficialNameRef = useRef();
    const invoiced_entityRef = useRef();

    // AddressRef, CityRef, StateRef, ZipRef, ABNRef, OfficialNameRef } = useRef();

    let client = clients.cl.find(client => client.id === parseInt(clientSelected));
    let check = manageFormType === 'edit' ? true : false;

    return (<>
        {check ? <h4>Edit Existing Client</h4> : <h4>Add New Client</h4>}
        <div className="editEntryForm">
            <p>
                <label htmlFor="clientName">Client Name</label>
                <input type="text" name="clientName" id="clientName" defaultValue={check ? client.name : ""} ref={clientNameRef} />
            </p>
            <p>
                <label htmlFor="Address">Address</label>
                <input type="text" name="Address" id="Address" defaultValue={check ? client.address : ""} ref={AddressRef} />
            </p>
            <p>
                <label htmlFor="City">City</label>
                <input type="text" name="City" id="City" defaultValue={check ? client.city : ""} ref={CityRef} />
            </p>
            <p>
                <label htmlFor="State">State</label>
                <input type="text" name="State" id="State" defaultValue={check ? client.state : ""} ref={StateRef} />
            </p>
            <p>
                <label htmlFor="Zip">Zip</label>
                <input type="text" name="Zip" id="Zip" defaultValue={check ? client.zip : ""} ref={ZipRef} />
            </p>
            <p>
                <label htmlFor="ABN">ABN</label>
                <input type="text" name="ABN" id="ABN" defaultValue={check ? client.ABN : ""} ref={ABNRef} />
            </p>
            <p>
                <label htmlFor="OfficialName">Official Name</label>
                <input type="text" name="OfficialName" id="OfficialName" defaultValue={check ? client.OfficialName : ""} ref={OfficialNameRef} />
            </p>
            <p>
                <label htmlFor="invoiced_entity">Invoiced Entity</label>
                <input type="text" name="invoiced_entity" id="invoiced_entity" defaultValue={check ? client.invoiced_entity : ""} ref={invoiced_entityRef} />
            </p>
        </div>
        <div className="buttonContainer">
            <input type={"submit"} value={check ? "SubmitEdit" : "SubmitNew"}
                onClick={(e) => handleManageFormSubmit(e,
                    client,
                    clientNameRef.current.value,
                    AddressRef.current.value,
                    CityRef.current.value,
                    StateRef.current.value,
                    ZipRef.current.value,
                    ABNRef.current.value,
                    OfficialNameRef.current.value,
                    invoiced_entityRef.current.value)} />
            <input type={"button"} value={"Cancel"} onClick={(e) => handleManageFormCancel(e)} />
        </div>
    </>)
};