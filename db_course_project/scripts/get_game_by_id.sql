CREATE OR REPLACE PROCEDURE get_game_by_id(IN p_game_id INT)
AS $$
BEGIN
    SELECT * FROM games WHERE game_id = p_game_id;
END;
$$ LANGUAGE plpgsql;
