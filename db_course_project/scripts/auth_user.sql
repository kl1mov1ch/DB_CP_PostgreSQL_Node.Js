CREATE OR REPLACE PROCEDURE authenticate_user(
    p_username VARCHAR(50),
    p_entered_password VARCHAR(255),
    OUT p_user_id INT,
    OUT p_role_id INT
) AS $$
DECLARE
    hashed_password VARCHAR(255);
BEGIN
    -- Поиск пользователя по имени
    SELECT user_id, role_id, password
    INTO p_user_id, p_role_id, hashed_password
    FROM users u
    WHERE u.username = p_username;

    -- Проверка, найден ли пользователь
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User not found: %', p_username;
    END IF;

    -- Проверка соответствия хешированного пароля
    IF NOT (p_entered_password = hashed_password) THEN
        RAISE EXCEPTION 'Invalid password for user: %', p_username;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error authenticating user: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE shopping_cart
ADD CONSTRAINT shopping_cart_game_id_fkey
FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE;
