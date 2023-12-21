CREATE OR REPLACE PROCEDURE add_game(
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_price DECIMAL(10, 2)
)
AS
$$
BEGIN
    -- Проверка наличия значений и неположительного значения для price
    IF p_title IS NOT NULL AND p_description IS NOT NULL AND p_price IS NOT NULL AND p_price >= 0 THEN
        INSERT INTO games(title, description, price) VALUES (p_title, p_description, p_price);
    ELSE
        RAISE EXCEPTION 'Invalid input values';
    END IF;
END;
$$ LANGUAGE plpgsql;
