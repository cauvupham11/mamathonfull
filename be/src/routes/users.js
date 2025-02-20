var express = require("express");
const getInforUser = require("../controllers/User/getUserInfor");
const validationMiddleware = require("../middlewares/validation.middleware");
const getUserInfoVSchema = require("../controllers/src/user/getUserInfoVSchema");
const upgradeHouse = require("../controllers/House/upgradeHouse");
const getUserHouseInfo = require("../controllers/House/getHouseInfo");
const deposit = require("../controllers/User/updateUser");

var router = express.Router();

/* GET users listing. */
router.get(
  "/:walletAddress",
  validationMiddleware(getUserInfoVSchema, "params"),
  getInforUser
);

router.post("/upgrade-house", upgradeHouse);
router.put("/deposit", deposit);
router.get("/:userId/house", getUserHouseInfo);

module.exports = router;
