const express = require('express');
const sqlite = require('sqlite3');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new sqlite.Database('Books.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS Books (
    books_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT UNIQUE,
    price INTEGER
)`);

db.run(`CREATE TABLE IF NOT EXISTS Customers (
    customer_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS Sales (
    sale_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    books_ID INTEGER,
    customer_ID INTEGER,
    FOREIGN KEY (books_ID) REFERENCES Books(books_ID),
    FOREIGN KEY (customer_ID) REFERENCES Customers(customer_ID)
)`);

app.get("/books", (req, res) => {
    db.all(`SELECT * FROM Books`, (err, books) => {
        if (err) res.status(500).send(err);
        else res.send(books);
    });
}); 

app.post("/AddBooks", (req, res) => {
    const book = req.body;
    db.run(`INSERT INTO Books (Title, Author, Price) VALUES (?, ?, ?)`, book.Title, book.Author, book.Price, function (err) {
        if (err) res.status(500).send(err);
        else {
            book.Books_ID = this.lastID;
            res.send(book);
        }
    });
});


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})