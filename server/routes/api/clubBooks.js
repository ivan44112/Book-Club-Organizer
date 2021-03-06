const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

/*
Gets books read or being read in club
GET REQUEST - /getFinishedBooks/:id
id to provide in url -> club id
provide in query params:status(false/true)
 */
router.get("/getClubBookStatus/:id", async (req, res) => {
    const club_id = req.params.id;
    const reading_status = req.query.status;

    try {
        const finishedBooks = await pool.query("SELECT book_id,club_books_id FROM club_books WHERE club_id=$1 AND reading_status=$2", [
            club_id, reading_status]);

        res.json(finishedBooks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Insert comment for book discussion
POST REQUEST - /addComment/:id
id to provide in url -> club_books_id
require:Bearer token -> book changes becomes currently logged in user
provide:comment
 */
router.post("/addComment/:id", authorize, async (req, res) => {
    const user_id = req.user;
    const club_books_id = req.params.id;
    const {comment} = req.body;

    try {
        await pool.query("INSERT INTO club_books_comments(user_id,club_books_id,comment) VALUES($1,$2,$3)", [
            user_id, club_books_id, comment
        ])

        res.json({status: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Gets comment and time posted from book discussion
GET REQUEST - /getComment/:id
id to provide in url -> club_books_id
 */
router.get("/getComment/:id", async (req, res) => {
    const club_books_id = req.params.id;

    try {
        const comments = await pool.query("SELECT comment, created_at, user_id FROM  club_books_comments WHERE club_books_id=$1", [club_books_id]);

        res.json(comments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
