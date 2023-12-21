CREATE PROCEDURE import_from_json()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS temp (data json);
    COPY temp FROM 'D:/db_course_project/json/games.json';

    CREATE TABLE IF NOT EXISTS games (
        game_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL
    );

    INSERT INTO games (title, description, price)
    SELECT
        value->>'title' as title,
        value->>'description' as description,
        (value->>'price')::numeric(10, 2) as price
    FROM temp, json_array_elements(data) as value;

    DROP TABLE IF EXISTS temp;
END;
$$;
CALL import_from_json();

Truncate games cascade ;