import React from "react";

export default function EntryTable(props) {
    const { entries, handleEntrySelected } = props;

    if (entries) {
        let en = entries.en;
        return (<div>
            <table className="standardTable">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Client</th>
                        <th>Project</th>
                        <th>Entry Date</th>
                        <th>Hours</th>
                        <th>Task</th>
                        <th>Invoice Reference</th>
                        <th>Comments</th>
                        <th>Invoiced</th>
                    </tr>
                </thead>
                <tbody>
                    {en.map((entry, i) => (
                        <tr key={i}>
                            <td onChange={(event) => handleEntrySelected(event)}><input type="radio" name="selectedEntry" value={entry.id} /></td>
                            <td>{entry.client ? entry.client : <>-</>}</td>
                            <td>{entry.project ? entry.project : <>-</>}</td>
                            <td>{entry.entry_date ? entry.entry_date : <>-</>}</td>
                            <td>{entry.hours ? entry.hours : <>-</>}</td>
                            <td>{entry.task ? entry.task : <>-</>}</td>
                            <td>{entry.invoice_reference ? entry.invoice_reference : <>-</>}</td>
                            <td>{entry.comments ? entry.comments : <>-</>}</td>
                            <td>{entry.invoiced ? entry.invoiced : <>-</>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    } else {
        return (<><p>loading</p></>)
    }
}