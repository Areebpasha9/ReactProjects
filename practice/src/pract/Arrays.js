import React from "react";
import {DataTable} from "bootstrap";
function Arrays() {
    const students = [
        {
            name: "Name",
            selector: row => row.name

        }, {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "age",
            selector: row => row.age
        }
    ]
    const Dat = [{
        id: 1,
        name: "Mohammad Areeb",
        email: "areebpasha95@gmail.com",
        age: 21
    },
    {
        id: 2,
        name: "Mohammad faiz",
        email: "areebpasha95@gmail.com",
        age: 21
    }, {
        id: 3,
        name: "Murad",
        email: "aa95@gmail.com",
        age: 21
    }, {
        id: 1,
        name: "Anees",
        email: "pasha95@gmail.com",
        age: 61
    }

    ]

    return (
        <div>


            {/* <DataTable

                columns={students}
                data={Dat}>

            </DataTable> */}
        </div>

    )
}
export default Arrays;