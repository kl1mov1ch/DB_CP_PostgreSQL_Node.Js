// routes/addGame.js
const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

// addGame.js
router.get('/', (req, res) => {
    const userId = req.query.user_id;
    res.render('addGameForm', { user_id: userId });
});

// POST-маршрут для обработки отправленной формы
router.post('/', async (req, res) => {
    const { title, description, price } = req.body;

    try {
        const addedGame = await gameController.addGame(title, description, price);
        const userId = req.body.user_id; // Заменим req.query.user_id на req.body.user_id
        res.redirect(`/games?user_id=${encodeURIComponent(userId)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
