const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 20;

    try {
        const { games, totalPages } = await gameController.getAllGames(page, pageSize);
        const user_id = req.query.user_id || null; // Извлекаем user_id из параметра запроса

        res.render('games', { games, totalPages, currentPage: page, user_id });
    } catch (error) {
        console.error('Error getting games with pagination:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
