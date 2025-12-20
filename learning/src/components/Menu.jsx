import React from "react";
import { ListGroup,ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <ListGroup>
            <ListGroupItem action as={Link} to="add-book">
          Add Book
        </ListGroupItem>
        <ListGroupItem action as={Link} to="all-books">
          All Books
        </ListGroupItem>
        <ListGroupItem action as={Link} to="update">
          Update Book
        </ListGroupItem>
            </ListGroup>
        </div>
    )
}
export default Menu;