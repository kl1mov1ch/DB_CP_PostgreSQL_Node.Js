// routes/deleteGame.js
const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

// DELETE-маршрут для удаления игры
router.delete('/delete', async (req, res) => {
    const { gameId, userId } = req.query;

    try {
        const result = await gameController.deleteGame(gameId);
        res.status(200).json({ message: 'Game deleted successfully', result });
    } catch (error) {
        console.error(error); // Добавьте эту строку
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
