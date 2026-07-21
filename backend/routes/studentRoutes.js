const express = require("express");

const router = express.Router();

const {

    getProfile

} = require("../controllers/studentController");

router.get("/profile/:roll", getProfile);

module.exports = router;