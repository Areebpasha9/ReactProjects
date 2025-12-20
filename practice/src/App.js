import logo from './logo.svg';
import './App.css';
import { useState ,React} from 'react';
import Effects from './pract/Effects';
import Arrays from './pract/Arrays';
import Memo from './pract/Memo';
import Learnforms from './pract/Learnforms';

function App() {
  
  function  parentAlert(){
    alert("Mohammad Areeb Pasha")
  }

  return (

<div className="App">
<Effects/>
{/* <Arrays/> */}
{/* <Memo alerts={parentAlert}/> */}
{/* <Learnforms/> */}
    </div>
  );
}


export default App;
