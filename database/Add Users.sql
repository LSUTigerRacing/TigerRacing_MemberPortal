CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(20) NOT NULL,
  user_role VARCHAR(20)
);

INSERT INTO users (user_name)
VALUES('HELLO WORLD');

DELETE FROM users
WHERE user_name = 'HELLO WORLD';

SELECT user_role
FROM users
WHERE user_name = 'HELLO WORLD';

--Get User
CREATE OR REPLACE FUNCTION get_user_by_name(p_name TEXT)
RETURNS SETOF users
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM users
  WHERE user_name = p_name;
END;
$$;

-- Get user by ID
CREATE OR REPLACE FUNCTION get_user_by_id(p_id INT)
RETURNS SETOF users
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY 
  SELECT *
  FROM users
  WHERE user_id = p_id;
END;
$$;