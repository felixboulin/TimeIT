import React from "react";
import './References.css';

function BottomReferences() {
    return (
        <div className="References" id="BottomReferences">
            <h2>Time Entry Details</h2>
            <div className="Selector selectText" id="TaskSelector">
                <label htmlFor="Task">Task</label>
                <input type="text" name="Task" />
                <button className="ReferenceButton" type="button" name="Add">Confirm</button>
            </div>

            <div className="Selector selectText" id="InvoiceReference">
                <label htmlFor="InvoiceReference">Invoice Ref.</label>
                <input type="text" name="InvoiceReference" />
                <button className="ReferenceButton" type="button" name="InvoiceReference">Confirm</button>
            </div>

            <div className="Selector selectText" id="Comments">
                <div className="childLabel">
                    <label htmlFor="CommentS">Comments</label>
                </div>
                <textarea name="CommentS" className="longText " ></textarea>
                <div className="childConfirm">
                    <button className="ReferenceButton" type="button" name="Comments">Confirm</button>
                </div>
            </div>

        </div>
    );
}

export default BottomReferences;