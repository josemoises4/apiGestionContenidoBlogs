const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/inicio", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/html/inicio.html"));
});

module.exports = router;
