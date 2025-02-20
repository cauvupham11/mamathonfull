var express = require("express");
const feeding = require("../controllers/Activitiy/feeding");
const sleeping = require("../controllers/Activitiy/sleeping");

var router = express.Router();

router.post("/feeding", feeding);
router.post("/sleeping", sleeping);
module.exports = router;
