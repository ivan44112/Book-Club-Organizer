const router = require("express").Router()
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");
const authorize = require("../../middleware/authorize");
const {
    registerValidation,
    loginValidation,
    userValidationResult
} = require("../../validation/userValidation");

/*
POST REQUEST - /register
provide:name,email,password(min 6 characters)
returns:Bearer token
 */
router.post("/register", registerValidation, userValidationResult, async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            return res.status(401).send("User already exists");
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING *", [name, email, bcryptPassword]);

        const token = jwtGenerator(newUser.rows[0].user_id);

        return res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

/*
POST REQUEST - /login
provide:email,password
returns: Bearer token
 */
router.post("/login", loginValidation, userValidationResult, async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
GET REQUEST - /currentUser
require: Bearer token
returns:email,name
 */
router.get("/currentUser", authorize, async (req, res) => {
    try {
        const user = await pool.query("SELECT name, email, user_id FROM users WHERE user_id=$1", [req.user]);

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
GET REQUEST - /currentUserById/:id
id to provide in url -> user id
returns:name
 */
router.get("/currentUserById/:id", async (req, res) => {
    const user_id = req.params.id;

    try {
        const user = await pool.query("SELECT name FROM users WHERE user_id=$1", [user_id]);

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
