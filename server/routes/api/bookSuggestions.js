const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

/*
Add a suggested book
PATCH REQUEST - /addBook/:id
id to provide in url -> club_id
require:Bearer token -> book suggested by currently logged in user
provide:book_id
 */
router.post("/addBook/:id", authorize, async (req, res) => {
    const user = req.user;
    const club_id = req.params.id;
    const {book_id} = req.body;

    try {
        const userBook = await pool.query("SELECT * FROM book_voting WHERE book_id=$1", [book_id])
        if (userBook.rows.length > 0) {
            return res.status(401).send("Book already suggested");
        }

        await pool.query("INSERT INTO book_voting(book_id, user_id, club_id) VALUES($1,$2,$3)", [
            book_id, user, club_id
        ]);

        res.json({success: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Get all suggested books and votes
PATCH REQUEST - /getBooks/:id
id to provide in url -> club_id
 */
router.get("/getBooks/:id", async (req, res) => {
    const club_id = req.params.id;

    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_id = $1", [club_id]);

        if (club.rows.length === 0) {
            return res.status(401).send("Club doesn't exist");
        }

        const books = await pool.query("SELECT book_id,votes FROM book_voting WHERE club_id=$1", [club_id]);

        res.json(books.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Adds vote for specific book
PATCH REQUEST - /addVote/:id
id to provide in url -> club_id
provide:book_id
 */
router.patch("/addVote/:id", async (req, res) => {
    const club_id = req.params.id;
    const {book_id} = req.body;

    try {
        const userBook = await pool.query("SELECT book_id FROM book_voting WHERE book_id=$1", [book_id])
        if (userBook.rows.length === 0) {
            return res.status(401).send("That book isn't added yet!");
        }
        await pool.query("UPDATE book_voting SET votes=COALESCE(votes,0)+1 WHERE book_id=$1 AND club_id=$2", [
             book_id, club_id
        ]);

        res.json({success: 'true'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
