CREATE OR REPLACE FUNCTION get_all_games(
    IN page INT,
    IN page_size INT
)
RETURNS TABLE (
    game_id INT,
    title VARCHAR,
    description TEXT,
    price NUMERIC
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        game_id,
        title,
        description,
        price
    FROM
        games
    ORDER BY
        game_id
    LIMIT
        page_size
    OFFSET
        (page - 1) * page_size;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE get_total_games_count(
    OUT total_games_count INT
)
AS $$
BEGIN
    -- Возврат общего количества игр
    SELECT COUNT(*) INTO total_games_count FROM games;
END;
$$ LANGUAGE plpgsql;
