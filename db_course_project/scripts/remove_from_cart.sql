-- Создание хранимой процедуры для удаления игры из корзины
CREATE OR REPLACE FUNCTION remove_from_cart(p_user_id INTEGER, p_game_id INTEGER) RETURNS VOID AS $$
BEGIN
    -- Запрос для удаления игры из корзины
    DELETE FROM shopping_cart WHERE user_id = p_user_id AND game_id = p_game_id;
END;
$$ LANGUAGE plpgsql;
