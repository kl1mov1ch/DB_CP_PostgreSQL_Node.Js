CREATE OR REPLACE PROCEDURE update_sales_statistics(IN p_game_id INT, IN p_amount DECIMAL)
AS $$
BEGIN
    INSERT INTO sales_statistics (game_id, quantity_sold, total_revenue, sales_date)
    VALUES (
        p_game_id,
        1,
        p_amount,
        CURRENT_TIMESTAMP
    )
    ON CONFLICT (game_id) DO UPDATE
    SET
        quantity_sold = sales_statistics.quantity_sold + 1,
        total_revenue = sales_statistics.total_revenue + p_amount,
        sales_date = CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION after_insert_payment_trigger()
RETURNS TRIGGER AS $$
BEGIN
    CALL update_sales_statistics(NEW.game_id,  NEW.amount);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER after_insert_payment
AFTER INSERT ON payments
FOR EACH ROW
EXECUTE FUNCTION after_insert_payment_trigger();