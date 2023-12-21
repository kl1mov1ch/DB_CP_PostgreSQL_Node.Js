CREATE OR REPLACE PROCEDURE update_game_by_id(
    IN p_game_id integer,
    IN p_title character varying DEFAULT NULL,
    IN p_description text DEFAULT NULL,
    IN p_price numeric DEFAULT NULL
)
LANGUAGE plpgsql
AS
$$
BEGIN
    -- Проверка наличия параметров и их обновление, если они переданы
    IF p_title IS NOT NULL AND p_description IS NOT NULL AND (p_price IS NULL OR (p_price IS NOT NULL AND p_price >= 0)) THEN
        UPDATE games
        SET
            title = COALESCE(p_title, title),
            description = COALESCE(p_description, description),
            price = COALESCE(p_price, price)
        WHERE
            game_id = p_game_id;
    ELSE
        -- Если хотя бы одно условие не выполнено, выбросить исключение
        RAISE EXCEPTION 'Invalid input values';
    END IF;
END;
$$;
