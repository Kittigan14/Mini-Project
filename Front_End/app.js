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

const base_url = 'http://localhost:3000';

app.get('/', async (req, res) => {
    try {

        const response = await axios.get(`${base_url}/books`);
        const books = response.data;
        res.render('Books_Store', { books });

    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    } 
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});