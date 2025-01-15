var express = require("express");
const addPet = require("../controllers/Pet/createPet");

var router = express.Router();

/* GET users listing. */
router.post("/", addPet);

module.exports = router;
