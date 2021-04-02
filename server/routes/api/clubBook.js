const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

/*
Changes current book being read in club
PATCH REQUEST - /changeBook/:id
id to provide in url-> club id
provide: book(id)
returns:email,name
todo->check if book provided is current book
 */
router.patch("/changeBook/:id", async (req, res) => {
    const {book} = req.body;
    const id = req.params.id;

    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_id = $1", [id]);

        if (club.rows.length === 0) {
            return res.status(401).send("Club doesn't exist");
        }
        await pool.query("UPDATE clubs SET current_book=$1, books_read=COALESCE(books_read,0)+1 WHERE club_id=$2", [book, id]);

        res.json({status: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Inserts new book currently being read in club
POST REQUEST - /addClubBook/:id
id to provide in url -> club id
todo->maybe remove current_book and books_read from clubs, get all that info from club_books
 */
router.post("/addClubBook/:id", async (req, res) => {
    const {book} = req.body;
    const club_id = req.params.id;
    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_id = $1", [club_id]);

        if (club.rows.length === 0) {
            return res.status(401).send("Club doesn't exist");
        }

        await pool.query("UPDATE club_books SET reading_status=false WHERE reading_status=true");
        await pool.query("INSERT INTO club_books(book_id, club_id) VALUES ($1,$2)", [book, club_id]);

        res.json({status: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Gets books read or being read in club
GET REQUEST - /getFinishedBooks/:id
id to provide in url -> club id
provide:status(false/true)
 */
router.get("/getFinishedBooks/:id", async (req, res) => {
    const club_id = req.params.id;
    const {status} = req.body;

    try {
        const finishedBooks = await pool.query("SELECT book_id FROM club_books WHERE club_id=$1 AND reading_status=$2", [club_id, status]);

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
require:Bearer token -> book changes becomes currently logged in person
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

        res.json({status:'true'});
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
router.get("/getComment/:id", async(req,res)=>{
    const club_books_id = req.params.id;

    try{
        const comments = await pool.query("SELECT comment, created_at FROM  club_books_comments WHERE club_books_id=$1", [club_books_id]);

        res.json(comments.rows);
    }catch(err){
       console.error(err.message);
       res.status(500).send("Server error");
    }
});

module.exports = router;