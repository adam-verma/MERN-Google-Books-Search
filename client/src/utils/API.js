require('dotenv').config();
const key = process.env.API_KEY; 
const URL = `https://www.googleapis.com/books/v1/volumes?`;
import axios from "axios"; 

export default {

    findBook: searchBy => {
        return axios.get(`${URL}q=${searchBy}&key=${key}`)
    },
    // Gets all books
    getBooks: () => {
    return axios.get("/api/books");
    },

    // Deletes book with given id
    deleteBook: id => {
        return axios.delete(`/api/books/${id}`);
    },

    // Saves a book to database
    saveBook: bookData => {
        return axios.post('/api/books', bookData);
    }
}