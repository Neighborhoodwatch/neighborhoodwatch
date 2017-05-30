INSERT INTO users (first_name, last_name, username, email, facebook_id, google_id, password, photo)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
ON CONFLICT(facebook_id)
DO UPDATE SET photo = $8 RETURNING first_name, last_name, username, email, facebook_id, google_id, photo, neighborhood_id, user_id;
-- ON CONFLICT(google_id) DO NOTHING RETURNING user_id;
