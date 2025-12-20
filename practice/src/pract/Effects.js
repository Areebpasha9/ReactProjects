import React, { useEffect, useState } from "react";
import App from "../App";
import User from "./User";
function Effects(){
    const[Data,setData]=useState(10);
    const[Count,setCount]=useState(0);

    return(
        <div className="">
        <User Count={Count} Data={Data}/>
            <button style={{margin:10,color:"yellowgreen"}} onClick={()=>setCount(Count+1)}>update Count</button>
            {/* <button onClick={()=>setData(Data+2)}>update Data</button> */}
            
        </div>
    );
}
export default Effects;