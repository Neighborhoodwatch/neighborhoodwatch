INSERT INTO users (first_name, last_name, username, email, facebook_id, google_id, password) 
VALUES ($1, $2, $3, $4, $5, $6, $7) 
ON CONFLICT(facebook_id) DO NOTHING RETURNING user_id;
