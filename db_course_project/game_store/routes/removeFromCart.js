// routes/removeFromCart.js
const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

// Обработчик удаления игры из корзины
router.get('/', async (req, res) => {
    const userId = req.query.user_id;
    const gameId = req.query.game_id;
    try {
        await gameController.removeFromCart(userId, gameId);
        res.redirect(`/cart?user_id=${userId}`);
    } catch (error) {
        console.error('Error removing game from cart:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
