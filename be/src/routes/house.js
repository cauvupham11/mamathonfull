const express = require('express');

const getHouseList = require('../controllers/house/getHouseList');

const router = express.Router();

router.get('/', getHouseList);

module.exports = router;