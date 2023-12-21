-- Создание представления для корзины пользователя
CREATE OR REPLACE VIEW cart_view AS
    SELECT shopping_cart.*, games.title, games.description, games.price
    FROM shopping_cart
    JOIN games ON shopping_cart.game_id = games.game_id;

-- Запрос для получения корзины по идентификатору пользователя
SELECT * FROM cart_view WHERE user_id = $1;
