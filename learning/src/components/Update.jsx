import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Update = () => {
    const location = useLocation();
    const [book, setBook] = useState({
        id:'',
        bname: '',
        author: ''
    });
    useEffect = (() => {
        if (location.state && location.state.book) {
            setBook(location.state.bname);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.value]: e.target.value });
    }
    const handleForm = (e) => {
        e.preventDefault();

    }
    return (
        <Fragment>
            <Form onSubmit={handleForm} >
                <FormGroup style={{marginBottom:30}}>
                    <input type="text"
                    placeholder="Enter Book Name"
                        id="name"
                        name="bname"
                        value={book.bname}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <input type="text"
                    placeholder="Enter Author Name"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Container style={{marginTop:30}}>
                    <Button type="submit" color="warning">Update</Button>
                    <Button type="reset" color="danger">Clear</Button>
                </Container>
            </Form>
        </Fragment>
    );
}
export default Update;