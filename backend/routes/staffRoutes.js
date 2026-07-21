const express = require("express");

const router = express.Router();

const {

    loginStaff

} = require("../controllers/staffController");

router.post("/login", loginStaff);

module.exports = router;