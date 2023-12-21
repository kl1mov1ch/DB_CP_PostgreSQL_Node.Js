-- Создание процедуры для получения корзины по идентификатору пользователя
CREATE OR REPLACE PROCEDURE get_cart_by_user_id(IN p_user_id INT)
LANGUAGE SQL
AS $$
    SELECT
        c.cart_id,
        c.user_id,
        c.game_id,
        g.title,
        g.description,
        g.price
    FROM
        shopping_cart c
    JOIN
        games g ON c.game_id = g.game_id
    WHERE
        c.user_id = p_user_id;
$$;

-- Создание процедуры для получения подробной информации об игре по идентификатору
CREATE OR REPLACE PROCEDURE get_game_details_by_id(IN p_game_id INT)
LANGUAGE SQL
AS $$
    SELECT
        g.game_id,
        g.title,
        g.description,
        g.price,
        s.quantity_sold,
        s.total_revenue
    FROM
        games g
    LEFT JOIN
        sales_statistics s ON g.game_id = s.game_id
    WHERE
        g.game_id = p_game_id;
$$;
