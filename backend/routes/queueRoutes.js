const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queueController");

router.post("/generate", queueController.generateToken);
router.get("/status/:department", queueController.getQueueStatus);
router.post("/next", queueController.nextToken);

module.exports = router;
