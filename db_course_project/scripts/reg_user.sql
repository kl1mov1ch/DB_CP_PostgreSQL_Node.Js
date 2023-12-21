CREATE OR REPLACE PROCEDURE register_user(
    p_username VARCHAR(50),
    p_role_id INT,
    p_password VARCHAR(255),
    OUT user_id INT
) AS $$
BEGIN
    -- Проверка существования role_id
    PERFORM role_id FROM roles WHERE role_id = p_role_id;

    -- Вставка пользователя и возврат user_id
    INSERT INTO users (username, role_id, password)
    VALUES (p_username, p_role_id, p_password)
    RETURNING users.user_id INTO user_id;

    -- Если вы хотите вернуть user_id, используйте ключевое слово OUT
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Error in register_user: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
