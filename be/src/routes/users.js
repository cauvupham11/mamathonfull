var express = require("express");
const getInforUser = require("../controllers/User/getUserInfor");
var router = express.Router();

/* GET users listing. */
router.get("/:walletAddress", getInforUser);

module.exports = router;
