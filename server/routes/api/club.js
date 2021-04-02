const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

/*
Creates a new club
POST REQUEST - /createClub
require: Bearer token -> admin becomes currently logged in person
provide:club_name
 */
router.post("/createClub", authorize, async (req, res) => {
    const {name} = req.body;
    const user_id = req.user;

    try {
        const club = await pool.query("SELECT * FROM clubs WHERE club_name = $1", [name]);

        if (club.rows.length > 0) {
            return res.status(401).send("Club with that name already exists");
        }
        const newClub = await pool.query("INSERT INTO clubs (club_name, club_admin) VALUES ($1,$2)", [name, user_id]);

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
require: Bearer token -> new member becomes currently logged in person
todo -> check if club exists
 */
router.post("/addMember/:id", authorize, async (req, res) => {
    const club_id = req.params.id;
    const user_id = req.user;

    try {
        const club = await pool.query("SELECT * FROM club_members WHERE club_id = $1 AND user_id=$2", [club_id, user_id]);

        if (club.rows.length > 0) {
            return res.status(401).send("Member already exists in that club");
        }
        await pool.query("INSERT INTO club_members (club_id, user_id) VALUES ($1,$2) RETURNING *", [club_id, user_id]);

        res.json({status: 'true'});
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


module.exports = router;
