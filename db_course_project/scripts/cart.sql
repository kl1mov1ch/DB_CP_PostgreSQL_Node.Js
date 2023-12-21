CREATE OR REPLACE FUNCTION add_to_cart(p_user_id INT, p_game_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO shopping_cart (user_id, game_id) VALUES (p_user_id, p_game_id);
END;
$$;

CREATE OR REPLACE FUNCTION remove_from_cart(p_cart_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM shopping_cart WHERE cart_id = p_cart_id;
END;
$$;
