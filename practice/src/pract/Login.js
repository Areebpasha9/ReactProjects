import React,{useState} from "react";
function Login(){
const[userState,setState]=useState(false);
const[userPass,setPass]=useState(false);
    function formHandle(e){
        e.preventDefault();
    }
    
function formHandler(e){
    let len=e.target.value.length
    if(len<5){
        setState(true);
    }
    else{
        setState(false);
    }

}
function passwordHandler(e){
    let len=e.target.value.length
    if(len<5){
        setPass(true);
    }
    else{
        setPass(false);
    }

}

    return(
        <div >

            <h2>Login</h2><br></br>
            
           <form onClick={formHandle}>
           <input type="text" placeholder="Enter Name" onChange={formHandler}></input><br/>{userState?<span style={{color:"red"}}>Invalid Length</span>:""}<br/>            
        <input type="password" placeholder="Enter Password" onChange={passwordHandler}></input><br/>{userPass?<span style={{color:"red"}}>Invalid Length</span>:""} <br/>
        <button type="submit">Submit</button>
        </form>
        </div>
    );
}
export default Login;