// src/routes/authRoutes.js
const express = require('express');
const authController = require('../src/controllers/gameController');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authController.authenticateUser(username, password);
        if (user && user.role_id === 9) {
            res.redirect(`/gamesUser?user_id=${user.user_id}`);
        } else if (user && user.role_id === 8) {
            res.redirect(`/games?user_id=${user.user_id}`);
        } else {
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        console.error('Error during login:', error);

        // Проверяем наличие свойства message в объекте ошибки
        const errorMessage = error.message || 'Internal Server Error';

        // Отправляем ошибку на страницу auth.ejs
        res.render('login', { errors: [{ msg: errorMessage }] });
    }
});


module.exports = router;
