var express = require("express");
const addPet = require("../controllers/Pet/createPet");

const feedPet = require("../controllers/Activitiy/feeding");
const levelUpPet = require("../controllers/Pet/LevelUpPet");

var router = express.Router();

/* GET users listing. */
router.post("/", addPet);

router.post("/feeding", feedPet);

router.post("/level", levelUpPet);

module.exports = router;
