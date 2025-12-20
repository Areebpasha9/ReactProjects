import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Toast } from "react-bootstrap";
import base_url from "./bootApi";

const AddBook = () => {
    const [book, setBook] = useState({
        bname: "",
        author: "",
    });
    const btnHandle = (e) => {
        // console.log(book);
        postDataToServer(book);
        e.preventDefault();
    };
    const postDataToServer = (data) => {
        axios.post(`${base_url}/addData`, data).then(
            (response) => {
                console.log(response);
                alert("Data Inserted Successfully");
                setBook({ bname: "", author: "" }); // Clear form after successful submission
            },
            (error) => {
                console.log(error);
                alert("Failed to insert data");
            }
        );
    };

    return (
        <div>
            <h3>Enter Book details</h3>

            <Form onSubmit={btnHandle}>
                <FormGroup style={{ marginBottom: 20 }}>
                    <input type="text" placeholder="Enter Book Name"
                        id="bname"
                        name="bname"
                        required
                        onChange={(e) => { setBook({ ...book, bname: e.target.value }) }} />
                </FormGroup>
                <FormGroup>
                    <input type="text" placeholder="Enter Author Name"
                        id="author"
                        name="author"
                        required

                        onChange={(e) => { setBook({ ...book, author: e.target.value }) }}
                    />
                </FormGroup>
                <Container style={{ marginTop: 20 }}>
                    <Button type="submit">Submit</Button>
                    <Button style={{ marginLeft: 20 }} type="reset">Clear</Button>
                </Container>
            </Form>
        </div>

    );

}
export default AddBook;