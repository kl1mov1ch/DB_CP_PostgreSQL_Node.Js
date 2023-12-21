CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    role_id INT,
    password VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    CONSTRAINT unique_game_title UNIQUE (title)
);

CREATE TABLE shopping_cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT,
    game_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE sales_statistics (
    statistic_id SERIAL PRIMARY KEY,
    game_id INT,
    quantity_sold INT,
    total_revenue DECIMAL(10, 2),
    sales_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id)
);

ALTER TABLE favorites
ADD CONSTRAINT favorites_game_id_fkey
FOREIGN KEY (game_id) REFERENCES games (game_id)
ON DELETE CASCADE;
ALTER TABLE favorites
DROP CONSTRAINT favorites_game_id_fkey;


CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    user_id INT,
    game_id INT,
    amount DECIMAL(10, 2),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
);
truncate table games cascade;

DO $$
DECLARE
    i INTEGER;
BEGIN
    FOR i IN 1..100000 LOOP
        INSERT INTO games (title, description, price)
        VALUES
            ('Game ' || i,
            'Description for Game ' || i,
            (random() * 100)::numeric(10, 2));
    END LOOP;
END $$;

