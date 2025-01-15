var express = require("express");
const getInforUser = require("../controllers/User/getUserInfor");
const validationMiddleware = require("../middlewares/validation.middleware");
const getUserInfoVSchema = require("../controllers/src/user/getUserInfoVSchema");
var router = express.Router();

/* GET users listing. */
router.get(
  "/:walletAddress",
  validationMiddleware(getUserInfoVSchema, "params"),
  getInforUser
);

module.exports = router;
