const express = require("express");
const axios = require("axios");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5500;

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "/public")));

// Connection Client BackEnd
const base_url = 'http://localhost:3000';

// Show Books Route
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${base_url}/books`);
        const books = response.data;
        res.render('Book_Store', { books });
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    } 
});

// Render Ejs AddBooks
app.get('/Addbooks', (req, res) => {
    res.render('AddBooks');
})

// Add Books Route
app.post('/AddBookPost', async (req, res) => {
    try {
        const data = req.body;
        await axios.post(`${base_url}/AddBooks`, data);
        res.redirect('/')

    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    } 
})

// Render EditBooks
app.get('/editBook/:books_ID', async (req, res) => {
    try {
        const bookId = req.params.books_ID;
        res.render('EditBooks', { bookId });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Update Books By Id Route
app.post('/editBookPost/:books_ID', async (req, res) => {
    try {
        const data = { 
            books_ID: req.params.books_ID,
            title: req.body.title, 
            author: req.body.author, 
            price: req.body.price 
        };

        await axios.post(`${base_url}/updateBook/${data.books_ID}`, data);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Delete Books by Id Route
app.get('/deleteBook/:books_ID', async (req, res) => {
    try {
        const bookId = req.params.books_ID;
        await axios.delete(`${base_url}/deleteBook/${bookId}`);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Server Start on Port 5500
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});