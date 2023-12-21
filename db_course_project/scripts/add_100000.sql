-- Хранимая процедура для добавления 100000 строк в таблицу games
CREATE OR REPLACE PROCEDURE insert_100000_games()
LANGUAGE plpgsql
AS $$
DECLARE
    v_counter INT := 1;
BEGIN
    -- Используем цикл для добавления 100000 строк
    WHILE v_counter <= 100000 LOOP
        INSERT INTO games(title, description, price)
        VALUES ('Game ' || v_counter, 'Description for Game ' || v_counter, RANDOM() * 100);

        -- Увеличиваем счетчик
        v_counter := v_counter + 1;
    END LOOP;
END;
$$;

call insert_100000_games();

