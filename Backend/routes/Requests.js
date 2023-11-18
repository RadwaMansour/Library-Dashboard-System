const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); //file system

// MAKE Request [ADMIN, USER]
router.post(
    "/create",
    authorized,
    body("book_id").isNumeric().withMessage("please enter a valid book id"),
    body("request").isBoolean().withMessage("please enter a valid Request"),
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            // 1- VALIDATION REQUEST [manual, express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- CHECK IF BOOK EXISTS OR NOT
            const book = await query("select * from books where id = ?", [
                req.body.book_id,
            ]);
            if (!book[0]) {
                res.status(404).json({ msg: "book not found !" });
            }
           

            // 3 - PREPARE BOOK REQUEST OBJECT
            const requestObj = {
                request: req.body.request,
                book_id: book[0].id,
                user_id: res.locals.user.id,
                book_name: book[0].name,
                user_name: res.locals.user.name,
                token: res.locals.user.token,
                book_pdf:"http://" + req.hostname + ":3000" + "/" + book[0].pdf_url,


            };
            

            // 4- INSERT BOOK OBJECT INTO DATABASE
            await query("insert into request set ? ", requestObj);

            res.status(200).json({
                msg: "request added successfully !",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);


//UPDATE REQUEST [ADMIN]
router.put(
    "/:id", //params
    admin,
    body("request")
        .isBoolean()
        .withMessage("please enter a valid request"),
        body("state")
        .isBoolean()
        .withMessage("please enter a valid state"),
    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({ errors: errors.array() });
            }

            //2- CHECK IF CHAPTER EXISTS OR NOT
            const request = await query("select * from request where id = ?", [
                req.params.id,
            ]);

            if (!request[0]) {
                res.status(404).json({ msg: "request not found !" });
            }

            // 3- PREPARE REQUEST OBJECT
            const requestObj = {
                request: req.body.request,
                state: req.body.state,
            }

            //4- UPDATE CHAPTER
            await query("update request set ? where id = ?", [
                requestObj,
                request[0].id
            ])

            res.status(200).json({
                msg: "request updated successfully !",
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    });

//DELETE REQUEST [USER]
router.delete(
    "/:id", //params
    admin,
    async (req, res) => {
        try {
            //1- CHECK IF BOOK EXISTS OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const request = await query("select * from request where id = ?", [
                req.params.id,
            ]);

            if (!request[0]) {
                res.status(404).json({ msg: "request not found !" });
            }

            // 2- REMOVE REQUEST   
            await query("delete from request where id = ?", [request[0].id])
            res.status(200).json({
                msg: "request deleted successfully !",
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
        search = `where book_name LIKE '%${req.query.search}%' or user_name LIKE '%${req.query.search}%'`;
    }
    const requests = await query(`select * from request ${search}`);
    res.status(200).json(requests);
});

//SHOW REQUEST [ADMIN, USER]
router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const request = await query("select * from request where user_id = ?", [
        req.params.id,
    ]);

    if (!request[0]) {
        res.status(404).json({ msg: "request not found !" });
    }

    res.status(200).json(request);
});
//SHOW REQUEST BY STATE[ADMIN, USER]s
router.get("/stat/:state", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const request = await query("select * from request where state = ?", [
        req.params.state,
    ]);
    if (!request) {
        res.status(404).json({ msg: "request not found !" });
    }

    res.status(200).json(request);
});

//SHOW REQUEST [USER]s
router.get("/req/:token",    authorized,
async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const request = await query("select * from request where token = ?", [
        req.params.token,
    ]);
    if (!request) {
        res.status(404).json({ msg: "request not found !" });
    }

    res.status(200).json(request);
});



module.exports = router;