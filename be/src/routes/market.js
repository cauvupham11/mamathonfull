var express = require("express");
const { getPetData } = require("../controllers/MarketPlace/blob/getPetData");
const createFood = require("../controllers/Food/createFood");
const createItem = require("../controllers/item/createItem");
const getAllFood = require("../controllers/MarketPlace/getAllFood");
const getAllItem = require("../controllers/MarketPlace/getAllItem");
const addFoodToChest = require("../controllers/MarketPlace/addFoodToChest");
var router = express.Router();

router.get("/pet", getPetData);
router.post("/food", createFood);
router.post("/item", createItem);
router.get("/foods", getAllFood);
router.get("/items", getAllItem);
router.post("/buy-food", addFoodToChest);
module.exports = router;
