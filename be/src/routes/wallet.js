var express = require("express");
const ConnectWallet = require("../controllers/Authenticate/ConnectWallet");
const authenticate = require("../middlewares/middleware.authenticate");
const getWalletBalance = require("../controllers/Wallet/GetWalletBalance");
const checkWallet = require("../controllers/Authenticate/CheckWallet");
const blobSubmitPet = require("../controllers/MarketPlace/blob/blobSubmitPet");
const connectWalletSchema = require("../controllers/src/Authenticate/checkWalletVSchema");
const validationMiddleware = require("../middlewares/validation.middleware");

var router = express.Router();

/* GET users listing. */
router.post("/connect", ConnectWallet);
router.post("/check", checkWallet);
router.post("/submit-blob", blobSubmitPet);
router.get("/balance/:walletAddress", getWalletBalance);
module.exports = router;
