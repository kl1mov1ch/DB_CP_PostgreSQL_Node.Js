const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.user_id;
        const cartGames = await gameController.getCartByUserId(userId);

        res.render('cart', { cartGames, user_id: userId });
    } catch (error) {
        console.error('Error getting cart games:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/removeFromCart', async (req, res) => {
    const userId = req.query.user_id;
    const gameId = req.query.game_id;
    try {
        // Ваш код для удаления игры из корзины
        await gameController.removeFromCart(userId, gameId);

        // После успешного удаления перенаправьте пользователя обратно на страницу корзины или другую страницу
        res.redirect('/cart?user_id=' + userId);
    } catch (error) {
        console.error('Error removing game from cart:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    try {
        const userId = req.query.user_id;
        const gameId = parseInt(req.body.game_id);

        if (!gameId || isNaN(gameId)) {
            throw new Error('Invalid game_id. Must be a non-empty integer.');
        }

        // Попробуйте добавить игру в корзину
        await gameController.addToCart(userId, gameId);

        // Если успешно, перенаправьте пользователя на страницу с играми пользователя
        return res.redirect(`/gamesUser?user_id=${userId}`);
    } catch (error) {
        // Если произошла ошибка, передайте сообщение об ошибке в объект res.render
        res.render('cart', { error: error.message, user_id: userId });
    }
});




module.exports = router;
