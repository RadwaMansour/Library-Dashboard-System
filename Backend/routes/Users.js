const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); //file system
const { lookup } = require("dns");
//CREATE [ADMIN]
router.post(
    "/create",
    admin,
    //uploadPDF.single("file"),
    body("name")
    .not().isEmpty()
        .isString()
        .withMessage("please enter a valid user name")
        .isLength({ min: 10 })
        .withMessage("user name should be at least 10 characters"),

    body("email")
    .not().isEmpty()
        .isString()
        .withMessage("please enter a valid email")
        .isLength({ min: 20 })
        .withMessage("email should be at least 20 characters"),

    body("password")
    .not().isEmpty()
        .isString()
        .withMessage("please enter a valid password")
        .isLength({ min: 10 })
        .withMessage("password should be at least 10 characters"),

    body("phone")
    .not().isEmpty()
        .isString()
        .withMessage("please enter a valid phone number")
        .isLength({ min: 11 })
        .withMessage("phone number should be 11 characters"),

        body("status")
        .not().isEmpty()

        .isBoolean()
        .withMessage("please enter a valid status"),
    //.isLength({ min: 10 })
    //.withMessage("field should be at least 10 characters"),

    body("type")
    .not().isEmpty()

        .isString()
        .withMessage("please enter a valid type")
        .isLength({ max: 6 })
        .withMessage("type should be at most 6 characters"),



    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- PREPARE user OBJECT
            const user = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                status: req.body.status,
                type: req.body.type,
                //pdf_url: req.files.filename[0],
            };

            //4-INSERT BOOK INTO DB
            const query = util.promisify(conn.query).bind(conn);
            await query("insert into users set ? ", user);
            res.status(200).json({
                msg: "user created successfully !",
            });
        } catch (err) {
            res.status(500).json(err)
        }
    });

//UPDATE BOOK [ADMIN]
router.put(
    "/:id", //params
    admin,
    body("name")
        .isString()
        .withMessage("please enter a valid book name")
        .isLength({ min: 10 })
        .withMessage("book name should be at least 10 characters"),

    body("email")
        .isString()
        .withMessage("please enter a valid email")
        .isLength({ min: 20 })
        .withMessage("email should be at least 20 characters"),

    body("password")
        .isString()
        .withMessage("please enter a valid password")
        .isLength({ min: 10 })
        .withMessage("password should be at least 10 characters"),

    body("phone")
        .isString()
        .withMessage("please enter a valid phone number")
        .isLength({ min: 11 })
        .withMessage("phone number should be 11 characters"),

    body("status")
        .isBoolean()
        .withMessage("please enter a valid status"),
    //.isLength({ min: 10 })
    //.withMessage("field should be at least 10 characters"),

    body("type")
        .isString()
        .withMessage("please enter a valid type")
        .isLength({ max: 6 })
        .withMessage("type should be at most 6 characters"),


    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);

                return res.status(400).json({ errors: errors.array() });
            }

            //2- CHECK IF USER EXISTS OR NOT
            const user = await query("select * from users where id = ?", [
                req.params.id,
            ]);

            if (!user[0]) {
                res.status(404).json({ msg: "user not found !" });
            }

            // 3- PREPARE USER OBJECT
            const userObj = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                status: req.body.status,
                type: req.body.type,
            }

            //4- UPDATE USER
            await query("update users set ? where id = ?", [
                userObj,
                user[0].id
            ])

            res.status(200).json({
                msg: "user updated successfully !",
            });

        } catch (err) {
            res.status(500).json(err)
        }
    });


//DELETE BOOK [ADMIN]
router.delete(
    "/:id", //params
    admin,
    async (req, res) => {
        try {
            //1- CHECK IF USER EXISTS OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const user = await query("select * from users where id = ?", [
                req.params.id,
            ]);

            if (!user[0]) {
                res.status(404).json({ msg: "user not found !" });
            }

            // 2- REMOVE USER   
            await query("delete from users where id = ?", [user[0].id])
            res.status(200).json({
                msg: "user deleted successfully !",
            });

        } catch (err) {
            res.status(500).json(err)
        }
    });


//LIST & SEARCH [ADMIN, USER]
router.get("", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    if (req.query.search) {
        //QUERY PARAMS
        search = `where name LIKE '%${req.query.search}%' or email LIKE '%${req.query.search}%'`;
    }
    const users = await query(`select * from users ${search}`);
    res.status(200).json(users);
});

//SHOW USERS [ADMIN, USER]
router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const user = await query("select * from users where id = ?", [
        req.params.id,
    ]);

    if (!user[0]) {
        res.status(404).json({ msg: "user not found !" });
    }
    res.status(200).json(user[0]);
});

//UPDATE Status [ADMIN]
router.put(
    "status/:id", //params
    admin,
    body("status")
        .isBoolean()
        .withMessage("please enter a valid status"),
    //.isLength({ min: 10 })
    //.withMessage("field should be at least 10 characters"),


    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);

                return res.status(400).json({ errors: errors.array() });
            }

            //2- CHECK IF USER EXISTS OR NOT
            const user = await query("select * from users where id = ?", [
                req.params.id,
            ]);

            if (!user[0]) {
                res.status(404).json({ msg: "user not found !" });
            }

            // 3- PREPARE USER OBJECT
            const userObj = {
                status: req.body.status,
            }

            //4- UPDATE USER
            await query("update users set ? where id = ?", [
                userObj,
                user[0].id
            ])

            res.status(200).json({
                msg: "user updated successfully !",
            });

        } catch (err) {
            res.status(500).json(err)
        }
    });


module.exports = router;