import { Button } from "bootstrap";
import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";


function Memo(props) {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(100);
    const [status,setStatus]=useState(false);
    const myArr = [{
        name: 'Areeb', email: 'areebpasha9548@gmail.com', address: [
            { City: 'Rampur', House: '02', Country: 'India' }
        ]
    },
    {
        name: 'Arman', email: 'arman@gmail.com', address: [
            { City: 'Delhi', House: 'B-801', Country: 'India' }
        ]
    },
    {
        name: 'Ilma', email: 'zaheerilma@gmail.com', address: [
            { City: 'Rampur', House: '02', Country: 'India' }
        ]
    }

    ];

    return (
        <div>
            {
            status?<Table border={10} striped variant="dark">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Address</td>
                    </tr>

                    {
                        myArr.map((items, i) =>
                            <tr key={i}>

                                <td>{items.name}</td>
                                <td>{items.email}</td>
                                <td>
                                    <table>
                                        <tbody>
                                            {
                                                items.address.map((data) =>
                                                    <tr>
                                                        <td>{data.House}</td>
                                                        <td>{data.City}</td>
                                                        <td>{data.Country}</td>
                                                    </tr>

                                                )}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>:"No record found"
            }
            <br/><br/>
            <button onClick={()=>setStatus(!status)}>Call</button><br/>
            {/* <button onClick={props.alerts}>Call Parent</button> */}
        </div>
    )
}
export default Memo;