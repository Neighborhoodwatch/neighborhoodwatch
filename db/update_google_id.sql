UPDATE users
	SET google_id = $1
	WHERE user_id = $2
RETURNING first_name, last_name, username, email, photo, user_id, neighborhood_id;
