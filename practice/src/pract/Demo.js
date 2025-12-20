import React, { useState } from "react";
function Demo() {
    const [log, setLog] = useState(false)

    return (
    <div>
    {log?     <h1>You are logged In!!</h1>:    <h1>You are logged Out!!</h1>}
        <button onClick={() => setLog(true)}>Login</button>
    
    </div>)


}
export default Demo;