-- Создание хранимой процедуры для добавления игры в корзину
CREATE OR REPLACE FUNCTION add_to_cart(p_user_id INTEGER, p_game_id INTEGER) RETURNS VOID AS $$
BEGIN
    -- Проверка, есть ли игра уже в корзине для данного пользователя
    IF EXISTS (SELECT 1 FROM shopping_cart WHERE user_id = p_user_id AND game_id = p_game_id) THEN
        -- Если игра уже есть в корзине, можно выбросить ошибку или вернуть сообщение
        RAISE NOTICE 'Game is already in the cart for user %, game %', p_user_id, p_game_id;
    ELSE
        -- Если игры еще нет в корзине, добавляем ее
        INSERT INTO shopping_cart (user_id, game_id) VALUES (p_user_id, p_game_id);
        RAISE NOTICE 'CART ADD % %', p_user_id, p_game_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Создание функции для удаления связанных записей в "payments"
CREATE OR REPLACE FUNCTION delete_payments_for_game()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM payments WHERE game_id = OLD.game_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Создание триггера для вызова функции перед удалением из "games"
CREATE TRIGGER trigger_delete_payments
BEFORE DELETE ON games
FOR EACH ROW
EXECUTE FUNCTION delete_payments_for_game();

