CREATE OR REPLACE FUNCTION filter_games_by_price_asc(pageSize INTEGER, offset_var INTEGER)
    RETURNS TABLE(game_id INTEGER, title VARCHAR, description TEXT, price NUMERIC)
    LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        games.game_id,
        games.title,
        games.description,
        games.price
    FROM
        games
    ORDER BY
        games.price ASC
    LIMIT
        pageSize
    OFFSET
        offset_var;
END;
$$;
