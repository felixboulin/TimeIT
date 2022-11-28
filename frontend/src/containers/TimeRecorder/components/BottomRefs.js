import React, { useState, useRef } from "react";
import '../TimeRecorder.css';

function BottomRefs(props) {
    const { task, invoiceRef, comment } = props;
    return (<>
        <div className="References" id="BottomReferences">
            <h2>Time Entry Details</h2>
            <div className="Selector selectText" id="TaskSelector">
                <label htmlFor="Task">Task</label>
                <input type="text" name="Task" ref={task} />
            </div>

            <div className="Selector selectText" id="InvoiceReference">
                <label htmlFor="InvoiceReference">Invoice Ref.</label>
                <input type="text" name="InvoiceReference" ref={invoiceRef} />
            </div>

            <div className="Selector selectText" id="Comments">
                <div className="childLabel">
                    <label htmlFor="CommentS">Comments</label>
                </div>
                <textarea name="CommentS" className="longText " ref={comment} ></textarea>
            </div>
        </div>
    </>);
}

export default BottomRefs;