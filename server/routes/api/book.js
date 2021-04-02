const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

/*
After a club decides it's next book, adds that book to every user for that club
POST REQUEST - /addUserBook/:id
id to provide in url -> club_id
provide:book_id
 */
router.post("/addUserBook/:id", async (req, res) => {
    const club_id = req.params.id;
    const {book_id} = req.body;

    try {
        const data = await pool.query("SELECT user_id FROM club_members WHERE club_id=$1", [club_id])
        const users = data.rows;

        for (let prop in users) {
            await pool.query("INSERT INTO user_books(book_id, user_id, club_id) VALUES($1,$2,$3) RETURNING *", [
                book_id, users[prop].user_id, club_id
            ])
        }

        res.json({success: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Update reading status of a book
PATCH REQUEST - /readingStatus/:id
id to provide in url -> club_id
require:Bearer token -> book changes for currently logged in person
provide:book_id, reading_status
 */
router.patch("/readingStatus/:id", authorize, async (req, res) => {
    const user = req.user;
    const club_id = req.params.id;
    const {book_id, reading_status} = req.body;

    try {
        const userBook = await pool.query("SELECT * FROM user_books WHERE book_id=$1", [book_id])
        if (userBook.rows.length === 0) {
            return res.status(401).send("User doesn't have that book added");
        }
        await pool.query("UPDATE user_books SET reading_status=$1, date_last_updated=timezone('cest'::text, CURRENT_TIMESTAMP) WHERE book_id=$2 AND user_id=$3 AND club_id=$4", [
            reading_status, book_id, user, club_id
        ]);

        res.json({success: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Get all books currently being read by user
GET REQUEST - /getUserBooks/:id
id to provide in url -> club_id
require:Bearer token -> books of currently logged in person
 */
router.get("/getUserBooks/:id", authorize, async (req, res) => {
    const user=req.user;

    try {
        const userBooks = await pool.query("SELECT * FROM user_books WHERE user_id=$1 AND reading_status='2'", [user]);

        res.json(userBooks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
