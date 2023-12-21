-- Создание хранимой процедуры
CREATE OR REPLACE FUNCTION search_games(keyword TEXT) RETURNS SETOF games AS $$
BEGIN
    RETURN QUERY
        SELECT * FROM games
        WHERE to_tsvector('english', title || ' ' || description) @@ to_tsquery('english', keyword);
END;
$$ LANGUAGE plpgsql;

-- Вызов процедуры
SELECT * FROM search_games('your_keyword');
