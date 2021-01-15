const router = require("express").Router()
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

router.post("/create", authorize, async(req,res)=>{
    const {name} = req.body;

    try{
        const club = await pool.query("SELECT * FROM clubs WHERE club_name = $1",[name]);

        if(club.rows.length > 0){
            return res.status(401).send("Club with that name already exsists");
        }

        const newClub = await pool.query("INSERT INTO clubs (club_name, club_admin) VALUES ($1,$2) RETURNING *", [name,req.user]);

        res.json(newClub.rows[0]);
    }catch(err){
       console.error(err.message);
    }
});
router.patch("/changebook/:id",async(req,res)=>{
    const {book} = req.body;
    const id = req.params.id;
    try{
        const club = await pool.query("SELECT * FROM clubs WHERE club_id = $1",[id]);

        if(club.rows.length === 0){
            return res.status(401).send("Club doesen't exist");
        }

        await pool.query("UPDATE clubs SET current_book=$1, books_read=COALESCE(books_read,0)+1 WHERE club_id=$2", [book,id]);

        res.json({status:'true'});
    }catch(err){
       console.error(err.message);
    }
})

router.post("/addMember/:id", authorize, async(req,res)=>{

    const club_id= req.params.id;

    try{
        const club = await pool.query("SELECT * FROM club_members WHERE club_id = $1 AND user_id=$2",[club_id,req.user]);

        if(club.rows.length > 0){
            return res.status(401).send("Member already exists");
        }

        const newMember = await pool.query("INSERT INTO club_members (club_id, user_id) VALUES ($1,$2) RETURNING *", [club_id,req.user]);

        res.json(newMember.rows[0]);
    }catch(err){
       console.error(err.message);
    }
})
/*
dodat u addMember?
 */

router.get("/countMembers/:id", async(req,res)=>{
    const id = req.params.id;
    const memCount = await pool.query("SELECT COUNT(*) FROM club_members WHERE club_id=$1",[id]);
    res.json(memCount.rows[0]);
})
module.exports = router;
