var express = require("express");
const addPet = require("../controllers/Pet/createPet");
const levelUp = require("../controllers/Pet/LevelUpPet");

var router = express.Router();

/* GET users listing. */
router.post("/", addPet);

router.post("/level", levelUp);

module.exports = router;
