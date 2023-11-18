const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const conn = require("../db/dbConnection");
const util = require("util"); // helper
const { json } = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//LOGIN
router.post(
    "/login",
    body("email").isEmail().withMessage("please enter a vaild email!"),
    body("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("password should be between (8-20) character"),
    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- CHECK IF EMAIL EXISTS
            //await/ async
            const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
            const user = await query(
                "select * from users where email = ?",
                [req.body.email]
            );
            if (user.length == 0) {
                res.status(404).json({
                    errors: [
                        {
                            msg: "email or password not found !",
                        },
                    ],
                });
            }


            // 3- COMPARE HASHED PASSWORD
            const checkPassword = await bcrypt.compare(req.body.password, user[0].password)
            if(checkPassword){
                delete user[0].password;
                res.status(200).json(user[0]);
            }else{
                res.status(404).json({
                    errors: [
                        {
                            msg: "email or password not found !",
                        },
                    ],
                });
            }

        } catch (err) {
            res.status(500).json({ err: err });
        }
    });


// REGISTRATION
router.post(
    "/register",
    body("email").isEmail().withMessage("please enter a vaild email!"),
    body("name")
        .isString()
        .withMessage("please enter a vaild name!")
        .isLength({ min: 10, max: 20 })
        .withMessage("name should be between (10-20) character"),
        body("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("password should be between (8-20) character"),
         body("phone")
        .isLength({ max: 11 })
        .withMessage("password should be 11 character"),
    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- CHECK IF EMAIL EXISTS
            //await/ async
            const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
            const checkEmailExists = await query(
                "select * from users where email = ?",
                [req.body.email]
            );
            if (checkEmailExists.length > 0) {
                res.status(400).json({
                    errors: [
                        {
                            msg: "email already exists !",
                        },
                    ],
                });
            }

            // 3-PREPARE OBJECT USER TO --> SAVE 
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                phone: req.body.phone,
                //status: req.body.status,
                token: crypto.randomBytes(16).toString("hex"), // JSON WEB TOKENCRYPTO -> RANDOM ENCRIPTION STANDARD
            };

            // 4- INSERT USER OBJECT INTO DB
            await query("insert into users set ? ", userData);
            delete userData.password;
            res.status(200).json(userData);
            res.json("success");
        } catch (err) {
            res.status(500).json({ err: err });
        }
    });
module.exports = router;