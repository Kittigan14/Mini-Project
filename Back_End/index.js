const express = require('express');
const sqlite = require('sqlite3');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Connection Database
const db = new sqlite.Database('Database.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS Books (
    books_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    price INTEGER,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Categories(categories_ID)
)`);

db.run(`CREATE TABLE IF NOT EXISTS Categories (
    categories_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name VARCHAR(255) NOT NULL
)`);

// Show Books Route
app.get("/books", (req, res) => {
    try {
        const sql = `SELECT Books.*, Categories.category_name 
                     FROM Books 
                     LEFT JOIN Categories ON Books.category_id = Categories.categories_ID`;
        db.all(sql, (err, books) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.send(books);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Add Books Route
app.post("/AddBooks", (req, res) => {
    const book = req.body;
    const sql = `INSERT INTO Books (title, author, price, category_id) VALUES (?, ?, ?, ?)`;
    db.run(sql, [book.title, book.author, book.price, book.category_id], (err) => {
        if (err) res.status(500).send(err);
        else {
            const books_ID = this.lastID;
            book.Books_ID = books_ID;
            res.send(book);
        }
    });
});

// Update Books Route
app.post('/updateBook/:books_ID', async (req, res) => {
    const books_ID = req.params.books_ID;
    const data = req.body;
    const sql = `UPDATE Books SET title = ?, author = ?, price = ?, category_id = ? WHERE books_ID = ?;`;

    db.run(sql, [data.title, data.author, data.price, data.category_id, books_ID], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to update');
        } else res.send('Update Successfully!');
    });
});

// Delete Books Route
app.delete('/deleteBook/:books_ID', (req, res) => {
    const bookId = req.params.books_ID;
    const sql = `DELETE FROM Books WHERE books_ID = ?`;

    db.run(sql, [bookId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else res.send(`Delete Books Id ${bookId} Successfully!`);
    })
});

// Server Start on Port 3000
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})