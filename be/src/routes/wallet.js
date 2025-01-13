var express = require("express");
const ConnectWallet = require("../controllers/Authenticate/ConnectWallet");
const authenticate = require("../middlewares/middleware.authenticate");
const getWalletBalance = require("../controllers/Wallet/GetWalletBalance");
const checkWallet = require("../controllers/Authenticate/CheckWallet");
var router = express.Router();

/* GET users listing. */
router.post("/connect", ConnectWallet);
router.post("/check", authenticate, checkWallet);

router.get("/balance/:walletAddress", getWalletBalance);
module.exports = router;
