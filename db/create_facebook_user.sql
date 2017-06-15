INSERT INTO users (username, facebook_id)
VALUES ($1, $2)
-- ON CONFLICT (facebook_id)
-- DO UPDATE SET username = $1
RETURNING first_name, last_name, username, email, facebook_id, google_id, photo, user_id;
