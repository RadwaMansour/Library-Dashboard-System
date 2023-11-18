const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); //file system
//CREATE [ADMIN]
router.post(
    "/create",
    admin,
    /*body("book_id")
    .isNumeric()
    .withMessage("please enter a valid book_id"),
*/
body("book_id").isNumeric().withMessage("please enter a valid book id"),

    body("title")
        .isString()
        .withMessage("please enter a valid chapter title")
        .isLength({ min: 10 })
        .withMessage("chapter title should be at least 10 characters"),

    body("description")
        .isString()
        .withMessage("please enter a valid description")
        .isLength({ min: 20 })
        .withMessage("description should be at least 20 characters"),

    async (req, res) => {
        try {

            //1- VALIDATION REQUEST [manual or express-validator]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({ errors: errors.array() });
            }

            //2- CHECK IF BOOK EXISTS OR NOT]
            const query = util.promisify(conn.query).bind(conn);
            const book = await query("select * from books where id = ?", [
                req.body.book_id,
            ]);

            if (!book[0]) {
                res.status(404).json({ msg: "book not found !" });
            }

            // 2- PREPARE Chapter OBJECT
            const chapter = {
                book_id: book[0].id,
                title: req.body.title,
                description: req.body.description,
            };

            //3-INSERT BOOK INTO DB
            await query("insert into book_chapters set ? ", chapter);
            res.status(200).json({
                msg: "chapter created successfully !",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    });

//UPDATE CHAPTER [ADMIN]
router.put(
    "/:id", //params
    admin,
    body("title")
        .isString()
        .withMessage("please enter a valid chapter title")
        .isLength({ min: 10 })
        .withMessage("chapter title should be at least 10 characters"),

    body("description")
        .isString()
        .withMessage("please enter a valid description")
        .isLength({ min: 20 })
        .withMessage("description should be at least 20 characters"),

    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //2- CHECK IF CHAPTER EXISTS OR NOT
            const chapter = await query("select * from book_chapters where id = ?", [
                req.params.id,
            ]);

            if (!chapter[0]) {
                res.status(404).json({ msg: "chapter not found !" });
            }

            // 3- PREPARE CHAPTER OBJECT
            const chapterObj = {
                title: req.body.title,
                description: req.body.description,
            }

            //4- UPDATE CHAPTER
            await query("update book_chapters set ? where id = ?", [
                chapterObj,
                chapter[0].id
            ])

            res.status(200).json({
                msg: "chapter updated successfully !",
            });

        } catch (err) {
            res.status(500).json(err)
        }
    });


//DELETE CHAPTER [ADMIN]
router.delete(
    "/:id", //params
    admin,
    async (req, res) => {
        try {
            //1- CHECK IF BOOK EXISTS OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const book = await query("select * from book_chapters where id = ?", [
                req.params.id,
            ]);

            if (!book[0]) {
                res.status(404).json({ msg: "chapter not found !" });
            }

            // 2- REMOVE BOOK   
            await query("delete from book_chapters where id = ?", [book[0].id])
            res.status(200).json({
                msg: "chapter deleted successfully !",
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
        search = `where title LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'*/`;
    }
    const chapters = await query(`select * from book_chapters ${search}`);
    res.status(200).json(chapters);
});

//SHOW CHAPTER [ADMIN, USER]
router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const book = await query("select * from book_chapters where book_id = ?", [
        req.params.id,
    ]);

    if (!book[0]) {
        res.status(404).json({ msg: "chapter not found !" });
    }
    res.status(200).json(book);
});



module.exports = router;