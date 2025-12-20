import React, { useState } from "react";
import { Form } from "react-bootstrap";

function Learnforms() {
    const [name, setName] = useState("");
    const [interest, setInterest] = useState("");
    const [TnC, setTnC] = useState(false);
    const [err, setErr] = useState(false);

    function getUserData(e) {
        e.preventDefault();
        let len = name.length;
        if(len<3){
            setErr(true);
        }
        else{
            setErr(false)
        }
        console.log(len);
        console.warn("Name:", name);
        console.warn("Interest:", interest);
        console.warn("Accepted TnC:", TnC);
    }

    return (
        <div>
            <h2>User Input Form</h2>
            <form onSubmit={getUserData} style={{ textAlign: "center" }}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}

                />{err?<span>Length cannot be less than 3 </span>:""}
                <br /><br />
                <select onChange={(e) => setInterest(e.target.value)}>
                    <option>Select Qualification</option>
                    <option>BCA</option>
                    <option>MCA</option>
                    <option>B-tech</option>
                    <option>M-tech</option>
                </select>
                <br /><br />
                <input
                    type="checkbox"
                    onChange={(e) => setTnC(e.target.checked)}
                />
                <span> Accept terms and conditions</span>
                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Learnforms;
