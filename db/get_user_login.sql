SELECT first_name, last_name, username, email, user_id, photo, neighborhood_id FROM users
WHERE password = $1
and username = $2;
