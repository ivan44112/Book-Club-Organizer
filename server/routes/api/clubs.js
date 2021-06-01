const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

/*
Creates a new club
POST REQUEST - /createClub
require: Bearer token -> admin becomes currently logged in user
provide:club_name
 */
router.post("/createClub", authorize, async (req, res) => {
    const user_id = req.user;
    const {name, description, category} = req.body;

    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_name = $1", [name]);

        if (club.rows.length > 0) {
            return res.status(401).send("Club with that name already exists");
        }
        const newClub = await pool.query("INSERT INTO clubs (club_name, admin, description, category) VALUES ($1,$2,$3,$4) RETURNING  *", [
            name, user_id, description, category]);

        const newClubId = newClub.rows[0].club_id;

        await pool.query("INSERT INTO club_members (club_id, user_id) VALUES ($1,$2)", [newClubId, user_id])

        res.json({success: "true"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Gets all clubs
GET REQUEST - /getClubs
returns: all clubs
 */
router.get("/getClubs", async (req, res) => {
    try {
        const clubs = await pool.query("SELECT * FROM clubs");

        res.json(clubs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Adds new member to club
POST REQUEST - /addMember/:id
id to provide in url -> club id
require: Bearer token -> new member becomes currently logged in user
 */
router.post("/addMember/:id", authorize, async (req, res) => {
    const club_id = req.params.id;
    const user_id = req.user;

    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_id=$1", [club_id]);

        if (club.rows.length === 0) {
            return res.status(401).send("Club doesn't exist!");
        }

        const clubmember = await pool.query("SELECT * FROM club_members WHERE club_id = $1 AND user_id=$2", [club_id, user_id]);

        if (clubmember.rows.length > 0) {
            return res.status(401).send("Member already exists in that club!");
        }

        const currentClubBook = club.rows[0].current_book;

        await pool.query("INSERT INTO club_members (club_id, user_id) VALUES ($1,$2) RETURNING *", [club_id, user_id]);
        await pool.query("INSERT INTO user_books(book_id, user_id, club_id) VALUES($1,$2,$3)", [currentClubBook, user_id, club_id]);

        res.json({status: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Remove a user from the club
DELETE REQUEST - /deleteMember/:id
id to provide in url -> club id
require: Bearer token -> logged in user leaves club
 */
router.delete("/deleteMember/:id", authorize, async (req, res) => {
    const club_id = req.params.id;
    const user_id = req.user;

    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_id=$1", [club_id]);
        if (club.rows.length === 0) {
            return res.status(401).send("Club doesn't exist!");
        }

        const clubmember = await pool.query("SELECT * FROM club_members WHERE club_id = $1 AND user_id=$2", [club_id, user_id]);
        if (clubmember.rows.length === 0) {
            return res.status(401).send("User isn't member of this club");
        }
        await pool.query("DELETE FROM club_members WHERE club_id=$1 AND user_id= $2", [club_id, user_id]);

        res.json({status: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Gets all clubs the user is in
GET REQUEST - /getUserClubs/
require: Bearer token -> gets clubs of currently logged in user
 */
router.get("/getUserClubs", authorize, async (req, res) => {
    const user_id = req.user;

    try {
        const userClubs = await pool.query("SELECT * FROM clubs AS c LEFT JOIN club_members AS cm ON c.club_id = cm.club_id  WHERE cm.user_id = $1", [user_id]);

        res.json(userClubs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Counts members in a club
GET REQUEST - /countMembers/:id
id to provide in url -> club id
returns:email,name
todo -> dodat u addMember?
 */
router.get("/countMembers/:id", async (req, res) => {
    const club_id = req.params.id;

    try {
        const memCount = await pool.query("SELECT COUNT(*) FROM club_members WHERE club_id=$1", [club_id]);

        res.json(memCount.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Changes voting phase to its current opposite value
PATCH REQUEST - /changeVotingPhase/:id
id to provide in url -> club id
 */
router.patch("/changeVotingPhase/:id", async (req, res) => {
    const club_id = req.params.id;

    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_id=$1", [club_id]);
        if (club.rows.length === 0) {
            return res.status(401).send("Club doesn't exist!");
        }

        const data = await pool.query("UPDATE clubs SET voting_phase= NOT voting_phase WHERE club_id=$1 RETURNING *", [club_id]);

        if (data.rows[0].voting_phase === false) {
            const bookVoteCompleted = await pool.query("UPDATE book_voting SET date_ended=timezone('cest', current_timestamp) WHERE club_id=$1 AND date_ended IS NULL RETURNING *",
                [club_id]
            )
            const bookVoteCompletedId = bookVoteCompleted.rows;

            for (let prop in bookVoteCompletedId) {
                await pool.query("DELETE FROM book_votes WHERE book_voting_id=$1", [bookVoteCompletedId[prop].book_voting_id])
            }
        }

        res.json({status: 'true'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;
