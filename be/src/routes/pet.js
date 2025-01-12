const express = require('express');
const router = express.Router();
const getPet = require('../controllers/pet/getPet');
const postPetUp = require('../controllers/pet/postPetUp');
router.get('/', getPet);
router.post('/up', postPetUp);
module.exports = router;