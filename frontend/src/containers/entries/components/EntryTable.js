import React from "react";

export default function EntryTable(props) {
    const { entries, handleEntrySelected } = props;

    if (entries) {
        let en = entries.en;
        return (<div>
            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Entry Date</th>
                        <th>Hours</th>
                        <th>Task</th>
                        <th>Invoice Reference</th>
                        <th>Comments</th>
                        <th>Project</th>
                        <th>Client</th>
                        <th>Invoiced</th>
                    </tr>
                </thead>
                <tbody>
                    {en.map((entry, i) => (
                        <tr key={i}>
                            <td onChange={(event) => handleEntrySelected(event)}><input type="radio" name="selectedEntry" value={entry.id} /></td>
                            <td>{entry.entry_date}</td>
                            <td>{entry.hours}</td>
                            <td>{entry.task}</td>
                            <td>{entry.invoice_reference}</td>
                            <td>{entry.comments}</td>
                            <td>{entry.project}</td>
                            <td>{entry.client}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    } else {
        return (<><p>loading</p></>)
    }
}