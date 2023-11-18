// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express");
const app = express();

// ==================== GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({extended: true})); // TO ACCESS URL FROM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); //ALLOW HTTP REQUESTS  THROUGH LOCAL HOSTS

// ==================== REQUIRED MODULE ====================
const auth = require("./routes/Auth");
const books = require("./routes/Books");
const chapters = require("./routes/Chapters");
const users = require("./routes/Users");
const requests = require("./routes/Requests");

// ==================== RUN THE APP ====================
app.listen(3000, "localhost", () => {
    console.log("SERVER IS RUNNING");
});

// ==================== API ROUTES [ENDPOINTS] ====================
app.use("/auth",auth);
app.use("/books",books);
app.use("/chapters",chapters);
app.use("/users",users);
app.use("/request",requests);
