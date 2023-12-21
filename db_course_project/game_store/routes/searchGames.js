const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

router.get('/', async (req, res) => {
    const { keyword } = req.query;
    try {
        const searchResults = await gameController.searchGames(keyword);
        res.render('search-results', { searchResults });
    } catch (error) {
        console.error('Error searching games:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
