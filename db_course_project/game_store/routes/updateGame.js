// routes/updateGame.js
const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

// Render the form with input for ID
router.get('/', (req, res) => {
    const { gameId } = req.query;
    if (gameId) {
        res.render('updateGameForm', { game: null, error: null, gameId });
    } else {
        res.render('updateGameForm', { game: null, error: null, gameId: null });
    }
});

// Handle form submission
router.post('/', async (req, res) => {
    const { gameId, title, description, price } = req.body;
    const userId = req.query.user_id;
    try {
        await gameController.updateGameById(gameId, title, description, price);
        res.redirect(`/games?user_id=${encodeURIComponent(userId)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
