var express = require("express");
const ConnectWallet = require("../controllers/Wallet/ConnectWallet");
var router = express.Router();

/* GET users listing. */
router.post("/connect", ConnectWallet);

module.exports = router;
