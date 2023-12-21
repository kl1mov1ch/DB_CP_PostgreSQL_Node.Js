const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

router.post('/', gameController.processPayment);

module.exports = router;