const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('home')    
})

router.get('/posts', (req, res) => {
    res.send("página de posts")
})

module.exports = router;
