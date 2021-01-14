const router = require("express").Router()
const pool = require("../../db");

router.post("/create",async(req,res)=>{
    const {name, admin} = req.body;

    try{
        const club = await pool.query("SELECT * FROM clubs WHERE club_name = $1",[name]);

        if(club.rows.length > 0){
            return res.status(401).send("Club with that name already exsists");
        }

        const newClub = await pool.query("INSERT INTO clubs (club_name, club_admin) VALUES ($1,$2) RETURNING *", [name,admin]);

        res.json(newClub.rows[0]);
    }catch(err){
       console.error(err.message);
    }
});
router.patch("/changebook/:id",async(req,res)=>{
    const {book} = req.body;
    const id = req.params.id;
    try{
        const newBook = await pool.query("UPDATE clubs SET current_book=$1 WHERE club_id=$2", [book,id]);

        res.json(newBook);
    }catch(err){
       console.error(err.message);
    }
})

module.exports = router;
