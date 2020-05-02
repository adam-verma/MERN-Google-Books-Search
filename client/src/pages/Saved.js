import React, { useState, useEffect } from "react";
import Delete from "../components/Delete";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";

const Books = () => {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books  and sets them to books
  const loadBooks = async () => {
    try {
      const response = await API.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.group("LOAD BOOKS");
      console.log(error);
      console.groupEnd();
    }
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  const deleteBook = async (id) => {
    try {
      await API.deleteBook(id);
      loadBooks();
    } catch(error) {
      console.group("DELETE A BOOK");
      console.log(error);
      console.groupEnd();
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Books On My List</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map(book => {
                return (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                      <p> {book.description} <hr />
                          {book.link} <hr />
                      </p>
                          {book.image}
                    </a>
                    <Delete onClick={() => deleteBook(book._id)} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;