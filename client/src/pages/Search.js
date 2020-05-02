import React, {useState, useEffect} from "react"; 
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Find";
import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import Save from "../components/Save";

const Search = () => {
    // Set component's initial state 
    const [ books, setBooks] = useState([])
    const [inputFields, setInputFields] = useState({
        author: "",
        title: "",
      });

      useEffect(() => {
        findBook();
      }, []);

      // Consumes Google Book API to match the input to 
      const findBook = async (input) => {
        try {
            const response = await API.findBook(input)
            let query = response.data.items.map(book => {
                book = {
                    id: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks.thumbnail,
                    link: book.volumeInfo.infoLink
                }
                return book;
            })
            setBooks(query);
        } catch (err) {
            console.group("SEARCH BOOKS");
            console.log(err);
            console.groupEnd();
        }   
      }

     // Handles updating component state when the user types into the input field
    const handleInputChange = event => {
        const { name, value } = event.target;
        setInputFields({
        ...inputFields,
        [name]: value
        });
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
        console.log(inputFields);
        findBook(inputFields.author || inputFields.title)
        } catch (error) {
            console.group("SUBMIT FORM");
            console.log(error);
            console.groupEnd();
        }
    };

    const handleSaveBook = async (event) => {
        event.preventDefault();
        console.log(books);
        if (inputFields.title || inputFields.author) {
            try {
                await API.saveBook(books.filter(book => book.id === event.target.id));
            } catch (error) {
                console.group("SAVE FORM");
                console.log(error);
                console.groupEnd();
            }
            }
    }
    return ( 
        <Container fluid>
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>What Books Should I Read?</h1>
                        </Jumbotron>
                        <form>
                            <Input
                            value={inputFields.title}
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                            />
                            <Input
                            value={inputFields.author}
                            onChange={handleInputChange}
                            name="author"
                            placeholder="Author (required)"
                            />
                            <FormBtn
                            disabled={!(inputFields.author || inputFields.title)}
                            onClick={handleFormSubmit}
                            >
                            Submit Book
                            </FormBtn>
                        </form>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                {books.length ? (
                <List>
                {books.map(book => {
                    return (
                    <ListItem key={book.id}>
                        <Row className="result">
                        <a href={"/books/" + book.id}>
                            <Col size="3" className="image">
                                <img src={book.image} alt={book.title} />
                            </Col>
                            <Col size="8">
                                <Row> 
                                <strong>
                                    {book.title} by {book.author}
                                </strong>
                                </Row>
                                <Row> 
                                    <TextArea className="description">
                                    {book.description}
                                    </TextArea>
                                </Row>
                            </Col>
                        </a>
                        </Row>
                        <Row>
                        <FormBtn className="linkBook">
                            <a href={book.link} >
                            Go to Book
                            </a>
                        </FormBtn>
                        <Save id={book.id} onClick={(event) => handleSaveBook(event)} />
                        </Row>
                    </ListItem>
                    );
                })}
                </List>
            ) : ["Search a book!"]
                }
            </Container> 
        </Container>
    )
}

export default Search;