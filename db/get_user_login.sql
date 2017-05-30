SELECT first_name, last_name, username, email, user_id, photo FROM users
WHERE password = $1
and username = $2;
