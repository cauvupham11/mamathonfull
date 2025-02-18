var express = require("express");
const { getPetData } = require("../controllers/MarketPlace/blob/getPetData");
var router = express.Router();

router.get("/pet", getPetData);
module.exports = router;
