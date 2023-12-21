-- Процедура для получения данных корзины по идентификатору пользователя
CREATE OR REPLACE PROCEDURE get_shopping_cart(IN user_id INT)
LANGUAGE SQL
AS $$
    SELECT * FROM shopping_cart WHERE user_id = $1;
$$;
