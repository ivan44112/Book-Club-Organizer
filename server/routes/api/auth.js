const router = require("express").Router()
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");
const authorize = require("../../middleware/authorize");
const {registerValidation,
    loginValidation,
    userValidationResult} = require("../../validation/userValidation");

router.post("/register", registerValidation,userValidationResult, async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);

        if(user.rows.length > 0){
            return res.status(401).send("User already exsists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);

        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *", [name,email,bcryptPassword]);

        const token = jwtGenerator(newUser.rows[0].user_id);

        return res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login",  loginValidation,userValidationResult, async(req,res)=>{

    const{email,password}=req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);

        if(user.rows.lenght===0){
            return res.status(401).json("Password or Email is incorrect");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token});
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/verify", authorize, async(req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
