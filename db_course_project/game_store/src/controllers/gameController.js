// src/controllers/gameController.js
const db = require('../models/db');
const bcrypt = require('bcrypt');
// Добавление новой игры
const addGame = async (title, description, price) => {
    const query = 'CALL add_game($1, $2, $3)';
    const values = [title, description, price];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'unique_game_title') {
            throw new Error('Game with this title already exists.');
        } else {
            throw error;
        }
    }
};

// Удаление игры по названию
// gameController.js

const deleteGame = async (gameId) => {
    try {
        // Вызываем хранимую процедуру delete_game_transaction
        await db.query('CALL delete_game_transaction($1)', [gameId]);

        console.log(`Game with ID ${gameId} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting game:', error);
        throw error;
    }
};

const getAllGames = async (page, pageSize) => {
    try {
        const offset = (page - 1) * pageSize;
        const query = 'SELECT game_id, * FROM games ORDER BY game_id LIMIT $1 OFFSET $2;';
        const result = await db.query(query, [pageSize, offset]);

        const games = result.rows;

        // Определите общее количество игр в базе данных для вычисления общего количества страниц
        const totalGamesQuery = 'SELECT COUNT(*) FROM games;';
        const totalGamesResult = await db.query(totalGamesQuery);
        const totalGames = totalGamesResult.rows[0].count;
        const totalPages = Math.ceil(totalGames / pageSize);

        return { games, totalPages };
    } catch (error) {
        console.error('Error getting games with pagination:', error);
        throw error;
    }
};


const getGameById = async (gameId) => {
    try {
        const query = 'CALL get_game_by_id($1)';
        const result = await db.query(query, [gameId]);
        // Возвращаем данные из процедуры
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateGameById = async (gameId, title, description, price) => {
    const query = 'CALL update_game_by_id($1, $2, $3, $4);';
    const values = [gameId, title, description, price];

    try {
        await db.query(query, values);
    } catch (error) {
        throw error;
    }
};

const getSortedGames = async (sortType, pageSize, page) => {
    let query;
    const offset = (page - 1) * pageSize;
    switch (sortType) {
        case 'desc':
            query = 'SELECT * FROM filter_games_by_price_desc($1, $2)';
            break;
        case 'asc':
            query = 'SELECT * FROM filter_games_by_price_asc($1, $2)';
            break;
        case 'title':
            query = 'SELECT * FROM filter_games_by_title_alphabetical($1, $2)';
            break;
        default:
            query = 'SELECT * FROM games ORDER BY game_id LIMIT $1 OFFSET $2';
    }
};


const searchGames = async (keyword) => {
    try {
        const query = 'SELECT * FROM games WHERE title ILIKE $1 OR description ILIKE $1';
        const result = await db.query(query, [`%${keyword}%`]);
        const searchResults = result.rows;
        return searchResults;
    } catch (error) {
        throw error;
    }
};


const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
};

const authenticateUser = async (username, enteredPassword) => {
    try {
        // Получаем данные пользователя из базы данных, включая user_id
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        console.log('Authentication query result:', result.rows);

        if (result.rows.length === 0) {
            throw new Error('User not found');
        }

        const user = result.rows[0];
        const hashedPassword = user.password;

        // Проверяем соответствие введенного пароля хешированному паролю
        const isMatch = await comparePasswords(enteredPassword, hashedPassword);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        console.log('User authenticated:', username, user.user_id, user.role_id);

        // Определите путь для перенаправления на основе роли пользователя
        const redirectPath = user.role_id === 9 ? '/gamesUser' : '/games';

        return {
            user_id: user.user_id,
            username,
            role_id: user.role_id,
            redirectPath,
        };
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        throw { message: error.message };
    }
};


const registerUser = async (username, password) => {
    try {
        const hashedPassword = await hashPassword(password);

        // Регистрируем пользователя с хешированным паролем
        const query = 'CALL register_user($1, $2, $3, $4)';
        const values = [username, 9, hashedPassword, null];
        const result = await db.query(query, values);

        const user_id = result.rows[0].user_id;
        console.log('User registered successfully. User ID:', user_id);
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
const addToCart = async (user, gameId) => {
    try {
        // Вызов хранимой процедуры для добавления игры в корзину
        const result = await db.query('SELECT add_to_cart($1, $2)', [user, gameId]);
        console.log('CART ADD' + ' ' + user + ' ' + gameId);
        return result;
    } catch (error) {
        throw error;
    }
};


const getCartByUserId = async (userId) => {
    try {
        // Запрос для получения корзины по идентификатору пользователя
        const result = await db.query('SELECT * FROM cart_view WHERE user_id = $1', [userId]);
        const cartGames = result.rows;
        return cartGames;
    } catch (error) {
        console.error('Error getting cart games:', error);
        throw error;
    }
};


const removeFromCart = async (userId, gameId) => {
    try {
        // Вызов хранимой процедуры для удаления игры из корзины
        const result = await db.query('Select * from remove_from_cart($1, $2)', [userId, gameId]);
        return result;
    } catch (error) {
        console.error('Error removing game from cart:', error);
        throw error;
    }
};


const getGameInCart = async (userId, gameId) => {
    try {
        const query = 'SELECT * FROM shopping_cart WHERE user_id = $1 AND game_id = $2';
        const result = await db.query(query, [userId, gameId]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const addToFavorites = async (userId, gameId) => {
    try {
        const checkQuery = 'SELECT game_id FROM favorites WHERE user_id = $1 AND game_id = $2';
        const checkResult = await db.query(checkQuery, [userId, gameId]);

        if (checkResult.rows.length > 0) {
            console.log('Game is already in favorites for user ' + userId);
        } else {
            // Если игры еще нет в избранном, добавляем ее
            const insertQuery = 'INSERT INTO favorites (user_id, game_id) VALUES ($1, $2) RETURNING *';
            const result = await db.query(insertQuery, [userId, gameId]);
            console.log('FAVORITES ADD' + ' ' + userId + ' ' + gameId);

            return result.rows[0];
        }
    } catch (error) {
        throw error;
    }
};


const removeFromFavorites = async (userId, gameId) => {
    try {
        const query = 'DELETE FROM favorites WHERE user_id = $1 AND game_id = $2 RETURNING *';
        const result = await db.query(query, [userId, gameId]);

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getFavoritesByUserId = async (userId) => {
    try {
        const query = `
            SELECT games.game_id, games.title, games.description, games.price
            FROM favorites
            JOIN games ON favorites.game_id = games.game_id
            WHERE favorites.user_id = $1
        `;
        const result = await db.query(query, [userId]);

        const favoriteGames = result.rows;
        return favoriteGames;
    } catch (error) {
        throw error;
    }
};

const showPaymentPage = async (req, res) => {
    try {
        const { gameId } = req.params;
        const user_id = req.user.id;
        const game = await db.query('SELECT * FROM games WHERE game_id = $1', [gameId]);
        if (game.rows.length === 0) {
            res.status(404).render('error', { message: 'Game not found' });
            return;
        }

        res.render('payments', {user_id, game: game.rows[0] });
    } catch (error) {
        console.error('Error showing payment page:', error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

const processPayment = async (req, res) => {
    try {
        const { user_id, game_id } = req.body;

        // Получаем цену игры с использованием подзапроса
        const priceQuery = 'SELECT price FROM games WHERE game_id = $1';
        const { rows } = await db.query(priceQuery, [game_id]);
        const gamePrice = rows[0].price;
        const updateStatisticsQuery = 'CALL update_sales_statistics($1, $2, CURRENT_TIMESTAMP)';
        await db.query(updateStatisticsQuery, [game_id, gamePrice]);
        const paymentInsertQuery = `
            INSERT INTO payments (user_id, game_id, amount, payment_date)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
        `;
        await db.query(paymentInsertQuery, [user_id, game_id, gamePrice]);
        res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const showSalesStatistics = async (req, res) => {
    try {
        // Получите данные о статистике продаж из вашей базы данных
        const salesStatistics = await getSalesStatistics();

        // Отобразите страницу статистики
        res.render('statistics', { salesStatistics });
    } catch (error) {
        console.error('Error showing sales statistics:', error);
        res.status(500).send('Internal Server Error');
    }
};
const getSalesStatistics = async () => {
    try {
        const query = `
            SELECT
                statistic_id,
                game_id,
                quantity_sold,
                total_revenue,
                sales_date
            FROM
                sales_statistics;
        `;
        const result = await db.query(query);
        const salesStatistics = result.rows;
        return salesStatistics;
    } catch (error) {
        throw error;
    }
};




module.exports = {
    addGame,
    deleteGame,
    getAllGames,
    updateGameById,
    getGameById,
    getSortedGames,
    searchGames,
    registerUser,
    authenticateUser,
    addToCart,
    removeFromCart,
    getCartByUserId,
    getGameInCart,
    addToFavorites,
    removeFromFavorites,
    getFavoritesByUserId,
    showPaymentPage,
    processPayment,
    showSalesStatistics,
    getSalesStatistics
};
