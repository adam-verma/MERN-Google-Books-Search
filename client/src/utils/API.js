import axios from "axios"; 

require('dotenv').config({ path: '/client/.env'});
const key = process.env.API_KEY;
console.log(key); 
const URL = `https://www.googleapis.com/books/v1/volumes?`;

export default {
    // Consumes Google API to find book based on keyword
    findBook: searchBy => {
        return axios.get(`${URL}q=${searchBy || ""}`)
    },
    // Gets all books from database
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