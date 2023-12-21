const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cartRoutes = require('./routes/cart');
const favoritesRoutes = require('./routes/favorites');
const deleteGameRoute = require('./routes/deleteGame');
const paymentsRoutes = require('./routes/payments');
const statisticsRouter = require('./routes/statistics');
const gamesSearchRoute = require('./routes/searchGames');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));
app.use('/addGame', require('./routes/addGame'));
app.use('/games', require('./routes/games'));
app.use('/gamesUser', require('./routes/userGames'));
app.use('/updateGame', require('./routes/updateGame'));
app.post('/register', require('./routes/register'));
app.post('/login', require('./routes/auth'));
app.use('/games', deleteGameRoute);
app.use('/cart', cartRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/payments', paymentsRoutes);
app.use('/statistics', statisticsRouter);
app.use('/games/search', gamesSearchRoute);
app.use('/gamesUser/search', gamesSearchRoute);
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/', (req, res) => {
    res.redirect('/register');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
