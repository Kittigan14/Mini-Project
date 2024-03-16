const sqlite = require('sqlite3');
const db = new sqlite.Database('Database.sqlite');

const Insertdata = [
    [1,"Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 10.99, 1],
    [2,"To Kill a Mockingbird", "Harper Lee", 9.99, 2],
    [3,"The Great Gatsby", "F. Scott Fitzgerald", 8.99, 2],
    [4,"1984", "George Orwell", 7.99, 2],
    [5,"Pride and Prejudice", "Jane Austen", 6.99, 2]
];

const booksInsert = db.prepare('INSERT INTO Books VALUES (?, ?, ?, ?, ?)');
Insertdata.forEach(data => booksInsert.run(data));
booksInsert.finalize();

db.close();


// const sqlite = require('sqlite3');
// const db = new sqlite.Database('Database.sqlite');

// const categoriesData = [
//     [1,"Fantasy"],
//     [2,"Fiction"]
// ];


// const categoriesInsert  = db.prepare('INSERT INTO Categories VALUES (?, ?)');
// categoriesData .forEach(data => categoriesInsert .run(data));
// categoriesInsert .finalize();

// db.close();