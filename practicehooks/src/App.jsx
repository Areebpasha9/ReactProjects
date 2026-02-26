import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './App.css'
import ChildA from './components/ChildA';
import { UserContext } from './context/UserContext';
import useFetch from './customhook/useFetch';
import useCounter from './customhook/useCounter';
function App() {

  const {data} =useFetch("https://jsonplaceholder.typicode.com/users");


  // const [time, setTime] = useState(0);
  // let timerRef = useRef(null);
  // let btRef = useRef();

  // function startTimer() {
  //   timerRef.current = setInterval(() => {
  //     setTime(time => time + 1);
  //   }, 1000)
  // }
  // function stopTimer() {
  //   clearInterval(timerRef.current);
  //   timerRef.current = null;
  // }

  // function resetTimer() {
  //   stopTimer();
  //   setTime(0);
  // }
  // function changeBtnColor() {
  //   btRef.current.style.backgroundColor = "red";
  //   btRef.current.style.color = "white";
  // }
  // const [name, setName] = useState({ name: "Areeb" });
  const {count, increment, decrement, reset} = useCounter(10);
  return (
    <div className='justify-center text-center text-3xl  mt-20'>

      <div>{data.map(u=>(
        <h2 className='p-5' key={u.id}>{u.name}</h2>
      ))}</div>



      {/* <h2>{count}</h2>
      <button onClick={increment}>++</button><br />
      <button onClick={decrement}>--</button><br />
      <button onClick={reset}>Reset</button> */}

      {/* <UserContext.Provider value={name}>
      <ChildA />
    </UserContext.Provider> */}

      {/* <div className='flex justify-center items-center mt-7'>
        <div>
          <h1 className='text-3xl font-bold'>Stop watch : {time}</h1>
          <br /><br />
          <button
            onClick={startTimer}
            className='text-2xl p-3 bg-green-400 border-2'>Start</button>
          <br /><br />
          <button
            onClick={stopTimer}
            className='text-2xl border-2 p-3 bg-amber-300'>Stop</button>
          <br /><br />
          <button
            onClick={resetTimer}
            ref={btRef}
            className='text-2xl bg-amber-200 p-3 border-2'>reset</button>
          <br /><br />
        </div>
        <button 
        onClick={changeBtnColor}
        className='font-bold text-3xl bg-pink-400 p-3 border-2'>Change Btn Color</button>
      </div> */}
    </div>
  )
}

export default App