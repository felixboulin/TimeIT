import React, { useRef } from "react";

export default function ManageForm(props) {
    const {
        entries,
        entrySelected,
        manageFormType,
        handleManageFormSubmit,
        handleManageFormCancel
    } = props;

    const entryDateRef = useRef();
    const hoursRef = useRef();
    const taskRef = useRef();
    const invoiceReferenceRef = useRef();
    const commentsRef = useRef();
    const invoicedRef = useRef();

    let entry = entries.en.find(entry => entry.id === parseInt(entrySelected));
    let check = manageFormType === 'edit' ? true : false;
    let invoiced_status = check ? entry.invoiced === 'Y' ? true : false : false;

    return (<>
        {check ? <h4>Edit Entry</h4> : <h4>Add New Entry</h4>}
        <div className="editEntryForm">
            <p>
                <label htmlFor="entryDate">Entry Date</label>
                <input type="date" name="entryDate" id="entryDate" defaultValue={check ? entry.entry_date : ""} ref={entryDateRef} />
            </p>
            <p>
                <label htmlFor="hours">Hours</label>
                <input type="number" name="hours" id="hours" defaultValue={check ? entry.hours : ""} ref={hoursRef} />
            </p>
            <p>
                <label htmlFor="task">Task</label>
                <input type="text" name="task" id="task" defaultValue={check ? entry.task : ""} ref={taskRef} />
            </p>
            <p>
                <label htmlFor="invoiceReference">Invoice Reference</label>
                <input type="text" name="invoiceReference" id="invoiceReference" defaultValue={check ? entry.invoice_reference : ""} ref={invoiceReferenceRef} />
            </p>
            <p>
                <label htmlFor="comments">Comments</label>
                <input type="text" name="comments" id="comments" defaultValue={check ? entry.comments : ""} ref={commentsRef} />
            </p>
            <p>
                <label htmlFor="invoiced">Invoiced</label>
                <input type="checkbox" name="invoiced" id="invoiced" defaultChecked={invoiced_status} ref={invoicedRef} />
            </p>
        </div>
        <div className="buttonContainer">
            <input type="submit" value={check ? "Submit Edit" : "Submit New"}
                onClick={(event) => handleManageFormSubmit(event,
                    entry,
                    entryDateRef.current.value,
                    hoursRef.current.value,
                    taskRef.current.value,
                    invoiceReferenceRef.current.value,
                    commentsRef.current.value,
                    invoicedRef.current.checked)} />
            <input type="button" value="Cancel" onClick={(event) => handleManageFormCancel(event)} />
        </div>
    </>)
}