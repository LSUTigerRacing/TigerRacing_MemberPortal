--Create 8 Dummy User Data
INSERT INTO users (user_name, user_role)
SELECT 
    'User_' || dummy_number AS user_name,  -- concatenate user and user #
    'Member' AS user_role  -- sets role to member
FROM generate_series(1, 8) AS dummy_number; -- generates a number for th dummy user