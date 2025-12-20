import axios from "axios";
import React from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, Container } from "react-bootstrap";
import base_url from "./bootApi";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import AllBooks from "./AllBooks";
import { toast } from "react-toastify";
import { useNavigate, useNavigation } from "react-router-dom";

const Book = ({ book, update }) => {
    const navigate = useNavigate();

    const deleteBookFromServer = (id) => {
        axios.delete(`${base_url}/delete/${id}`).then(
            (Response) => {
                toast.success("Deleted");
                // alert("Book Deleted");
                console.log(book)
                update();
            },
            (error) => {
                console.log(error)
                alert(error);
            }
        )
    }

    const updateBook = (id) => {
        axios.get(`${base_url}/book/${id}`).then(
            (Response) => {
                console.log(id)
                console.log(Response.data)
                navigate("/update", { state: { book: Response.data } });
            },
            (error) => {
                console.log(error)
            }
        )

    }





    return (
        <Card style={{ backgroundColor: "lightgoldenrodyellow", marginBottom: 6 }}>
            <CardBody>
                <CardSubtitle>
                    {book.bname}
                </CardSubtitle>
                <CardText>
                    {book.author}
                </CardText>
                <Container>
                    <Button color="danger"
                        onClick={() => { deleteBookFromServer(book.id) }}
                    >Delete</Button>
                    <Button color="warning" onClick={() => { updateBook(book.id) }}>Update</Button>
                </Container>
            </CardBody>
        </Card>
    )
}
export default Book;