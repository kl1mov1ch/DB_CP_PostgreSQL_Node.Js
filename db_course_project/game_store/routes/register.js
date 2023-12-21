const express = require('express');
const router = express.Router();
const gameController = require('../src/controllers/gameController');

// Добавляем обработчик регистрации
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Регистрируем пользователя с использованием gameController
        const userId = await gameController.registerUser(username, password);
        // Перенаправляем на страницу с играми
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
