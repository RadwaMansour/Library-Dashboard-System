const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const uploadPDF = require("../middleware/uploadPDFs");
const util = require("util"); // helper
const fs = require("fs"); //file system
//CREATE [ADMIN]
router.post(
    "/create",
    admin,
    upload.array("image", 2),
    //uploadPDF.single("file"),
    body("name")
        .isString()
        .withMessage("please enter a valid book name")
        .isLength({ min: 10 })
        .withMessage("book name should be at least 10 characters"),

    body("description")
        .isString()
        .withMessage("please enter a valid description")
        .isLength({ min: 20 })
        .withMessage("description should be at least 20 characters"),

    body("author")
        .isString()
        .withMessage("please enter a valid author name")
        .isLength({ min: 10 })
        .withMessage("author name should be at least 10 characters"),

    body("field")
        .isString()
        .withMessage("please enter a valid field")
        .isLength({ min: 10 })
        .withMessage("field should be at least 10 characters"),

    body("publication_date")
        .isDate()
        .withMessage("please enter a valid date"),
    //.isLength({ min: 10 })
    //.withMessage("field should be at least 10 characters"),


    async (req, res) => {
        try {
            //1- VALIDATION REQUEST [manual or express-validator]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                    console.log(errors);
                    return res.status(400).json({ errors: errors.array() });
            }

            //2- VALIDATE THE IMAGE
            if (!req.files) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Image is required !",
                        }
                    ],
                });
            }


            // 3- PREPARE BOOK OBJECT
            const book = {
                name: req.body.name,
                description: req.body.description,
                image_url: req.files[0].filename,
                author: req.body.author,
                field: req.body.field,
                publication_date: req.body.publication_date,
                pdf_url: req.files[1].filename,
            };

            //4-INSERT BOOK INTO DB
            const query = util.promisify(conn.query).bind(conn);
            await query("insert into books set ? ", book);
            res.status(200).json({
                msg: "book created successfully !",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    });

//UPDATE BOOK [ADMIN]
router.put(
    "/:id", //params
    admin,
    upload.array("image", 2),
    body("name")
        .isString()
        .withMessage("please enter a valid book name")
        .isLength({ min: 10 })
        .withMessage("book name should be at least 10 characters"),

    body("description")
        .isString()
        .withMessage("please enter a valid description")
        .isLength({ min: 20 })
        .withMessage("description should be at least 20 characters"),
    body("author")
        .isString()
        .withMessage("please enter a valid author name")
        .isLength({ min: 10 })
        .withMessage("author name should be at least 10 characters"),

    body("field")
        .isString()
        .withMessage("please enter a valid field")
        .isLength({ min: 10 })
        .withMessage("field should be at least 10 characters"),

    body("publication_date")
        .isDate()
        .withMessage("please enter a valid date"),
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

            //2- CHECK IF BOOK EXISTS OR NOT
            const book = await query("select * from books where id = ?", [
                req.params.id,
            ]);

            if (!book[0]) {
                res.status(404).json({ msg: "book not found !" });
            }

            // 3- PREPARE BOOK OBJECT
            const bookObj = {
                name: req.body.name,
                description: req.body.description,
                image_url: req.files[0].filename,
                author: req.body.author,
                field: req.body.field,
                publication_date: req.body.publication_date,
                pdf_url: req.files[1].filename,
            }

            
      if (req.files) {
        bookObj.image_url = req.files[0].filename;
        bookObj.pdf_url = req.files[1].filename;
        fs.unlinkSync("./upload/" + book[0].image_url); // delete old image
        fs.unlinkSync("./upload/" + book[0].pdf_url); // delete old pdf
      }


            //4- UPDATE BOOK
            await query("update books set ? where id = ?", [
                bookObj,
                book[0].id
            ])

            res.status(200).json({
                msg: "book updated successfully !",
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    });


//DELETE BOOK [ADMIN]
router.delete(
    "/:id", //params
    admin,
    async (req, res) => {
        try {
            //1- CHECK IF BOOK EXISTS OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const book = await query("select * from books where id = ?", [
                req.params.id,
            ]);

            if (!book[0]) {
                res.status(404).json({ msg: "book not found !" });
            }

            // 2- REMOVE BOOK   
            fs.unlinkSync("./upload/" + book[0].image_url);
            fs.unlinkSync("./upload/" + book[0].pdf_url);
            await query("delete from books where id = ?", [book[0].id])
            res.status(200).json({
                msg: "book deleted successfully !",
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
        search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
    }
    const books = await query(`select * from books ${search}`);
    books.map((book) => {
        book.image_url = "http://" + req.hostname + ":3000" + "/" + book.image_url;
        book.pdf_url = "http://" + req.hostname + ":3000" + "/" + book.pdf_url;
    });
    res.status(200).json(books);
});

//SHOW BOOK [ADMIN, USER]
router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const book = await query("select * from books where id = ?", [
        req.params.id,
    ]);

    if (!book[0]) {
        res.status(404).json({ msg: "book not found !" });
    }

    book[0].image_url = "http://" + req.hostname + ":3000" + "/" + book[0].image_url;
    book[0].pdf_url = "http://" + req.hostname + ":3000" + "/" + book[0].pdf_url;
    res.status(200).json(book[0]);
});


module.exports = router;