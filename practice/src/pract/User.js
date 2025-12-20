import React, { useEffect } from "react";
function User(props){

  useEffect(()=>{
      
        console.warn("updating data")
    },[props.Data])

    
    return(
<div className="primary">
    
    <h2>props count:{props.Count}</h2>
    <h2>props Data:{props.Data}</h2>
    
   

</div>
    );
}
export default User;