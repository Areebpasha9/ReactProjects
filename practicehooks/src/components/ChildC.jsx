import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

function ChildC() {
    const user = useContext(UserContext);
    var ar = [10, 11, 12, 13, 14];
        const res=ar.filter(n=>n%2==0).map(m=>m*2);
        console.log(res);
        const obj={
            a:1,
            b:2,
            c:3
        };
        console.log(Object.entries(obj));
        

    return (
        <div>
            Hello{user.name}

        </div>
    )
}
export default ChildC;