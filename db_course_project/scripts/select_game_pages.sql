CREATE OR REPLACE PROCEDURE get_games_with_pagination(IN p_page_number INT, IN p_page_size INT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Используйте PERFORM для отбрасывания результатов SELECT-запроса
    PERFORM
    FROM games
    ORDER BY game_id
    OFFSET (p_page_number - 1) * p_page_size
    LIMIT p_page_size;
END;
$$;

drop procedure get_games_with_pagination;