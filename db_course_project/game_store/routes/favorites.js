const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.user_id;
        const favoriteGames = await gameController.getFavoritesByUserId(userId);

        res.render('favorites', { favoriteGames, user_id: userId });
    } catch (error) {
        console.error('Error getting favorite games:', error);
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

        // Попробуйте добавить игру в избранное
        await gameController.addToFavorites(userId, gameId);

        // Если успешно, перенаправьте пользователя на страницу с избранными играми
        return res.redirect(`/favorites?user_id=${userId}`);
    } catch (error) {
        // Если произошла ошибка, передайте сообщение об ошибке в объект res.render
        res.render('favorites', { error: error.message, user_id: userId });
    }
});

router.get('/removeFromFavorites', async (req, res) => {
    const userId = req.query.user_id;
    const gameId = req.query.game_id;
    try {
        // Ваш код для удаления игры из избранного
        await gameController.removeFromFavorites(userId, gameId);

        // После успешного удаления перенаправьте пользователя обратно на страницу избранного или другую страницу
        res.redirect('/favorites?user_id=' + userId);
    } catch (error) {
        console.error('Error removing game from favorites:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
