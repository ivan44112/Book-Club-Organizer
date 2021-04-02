const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

router.post("/addBook", async (req, res) => {
    const {name, author, pages, rating} = req.body;
    try {
        const book = await pool.query("SELECT * FROM books WHERE book_name=$1", [name])
        if (book.rows.length > 0) {
            return res.status(401).send("Book already exists");
        }
        const newBook = await pool.query("INSERT INTO books (book_name,book_author,pages_num,rating) VALUES($1,$2,$3,$4) RETURNING *", [name, author, pages, rating]);

        res.json(newBook.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/userBook/:id", authorize, async (req, res) => {
    const {isReading} = req.body;
    const bookId = req.params.id;
    try {
        const userBook = await pool.query("SELECT * FROM user_books WHERE book_id=$1", [bookId])
        if (userBook.rows.length > 0) {
            return res.status(401).send("User already has that book added");
        }
        const newBook = await pool.query("INSERT INTO user_books (book_id,user_id,is_reading) VALUES ($1,$2,$3) RETURNING *", [bookId, req.user, isReading]);

        res.json(newBook.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.patch("/readingStatus/:id", authorize, async (req, res) => {
    const {isReading} = req.body;
    const bookId = req.params.id;
    try {
        const userBook = await pool.query("SELECT * FROM user_books WHERE book_id=$1", [bookId])
        if (userBook.rows.length === 0) {
            return res.status(401).send("User doesen't have that book added");
        }
        await pool.query("UPDATE user_books SET is_reading=$1 WHERE book_id=$2 AND user_id=$3", [isReading, bookId, req.user])

        res.json({success: 'true'});
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getUserBooks", authorize, async (req, res) => {
    try {
        const userBooks = await pool.query("SELECT * FROM user_books WHERE user_id=$1", [req.user]);

        res.json(userBooks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
