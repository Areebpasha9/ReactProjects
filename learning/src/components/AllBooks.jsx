import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "./bootApi";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import Book from "./Book";
import { toast ,ToastContainer } from "react-toastify";
const AllBooks = () => {

    const [book, setBook] = useState([]);

    const getAllBooks = () => {
        axios.get(`${base_url}/allBooks`).then(
            (Response) => {
                console.log(Response.data);
                setBook(Response.data);
                
                 toast.success('Data Fetched')   

            },
            (error) => {
                console.log(error)

                toast.error("Failed")
            }
        )
    }
    useEffect(() => {
        getAllBooks();
    }, []);

    const updateBook = (id) => {
        setBook(book.filter((c) => c.id !== id));
    }

    return (
        <div>
            <ul style={{ height: 250, overflowY: "scroll" }}>
                {book.length > 0 ?
                    book.map((item) => (
                        <Book key={item.id} book={item}
                            update={updateBook} />
                    ))
                    : (<p>No Books to display</p>)}
            </ul>
        </div>
    );
}
export default AllBooks;