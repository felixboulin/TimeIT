import React from "react";

export default function ClientTable(props) {
    const { clients, handleClientSelected } = props;

    if (clients) {
        // console.log(clients);
        let cl = clients.cl;
        return (<div>
            <table className="standardTable">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Client</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Business Number</th>
                        <th>Official Name</th>
                        <th>Invoiced Entity</th>
                    </tr>
                </thead>
                <tbody>
                    {cl.map((client, i) => (
                        <tr key={i}>
                            <td onChange={(event) => handleClientSelected(event)}><input type="radio" name="selectedClient" value={client.id} /></td>
                            <td>{client.name}</td>
                            <td>{client.address ? client.address : <>-</>}</td>
                            <td>{client.city ? client.city : <>-</>}</td>
                            <td>{client.state ? client.state : <>-</>}</td>
                            <td>{client.zip ? client.zip : <>-</>}</td>
                            <td>{client.ABN ? client.ABN : <>-</>}</td>
                            <td>{client.OfficialName ? client.OfficialName : <>-</>}</td>
                            <td>{client.invoiced_entity ? client.invoiced_entity : <>-</>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    } else {
        return (<><p>loading</p></>)
    }
};