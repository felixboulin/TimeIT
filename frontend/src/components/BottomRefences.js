import React from "react";
import './References.css';

function BottomReferences() {
    return (
        <div className="References" id="BottomReferences">
            <h1>Bottom References</h1>
            <form className="ReferenceForm">
                <div className="Selector" id="InvoiceReference">
                    <label htmlFor="InvoiceReference">Invoice Reference</label>
                    <input type="text" name="InvoiceReference" />
                    <button className="ReferenceButton" name="InvoiceReference">Confirm</button>
                </div>
            </form>
        </div>
    );
}

export default BottomReferences;