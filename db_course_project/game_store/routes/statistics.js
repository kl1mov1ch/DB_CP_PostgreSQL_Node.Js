// routes/statistics.js
const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

router.get('/', gameController.showSalesStatistics);

module.exports = router;
