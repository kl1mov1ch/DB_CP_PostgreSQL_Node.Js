CREATE OR REPLACE PROCEDURE delete_game_transaction(p_game_id INT)
AS $$
BEGIN
    -- Ваш код для удаления связанных данных из sales_statistics
    DELETE FROM sales_statistics WHERE game_id = p_game_id;
    Delete FROM favorites WHERE game_id = p_game_id;
    delete  From shopping_cart WHERE game_id= p_game_id;

    -- Ваш код для удаления игры из таблицы games
    DELETE FROM games WHERE game_id = p_game_id;
END;
$$ LANGUAGE plpgsql;