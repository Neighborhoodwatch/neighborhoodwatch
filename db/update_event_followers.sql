UPDATE following
SET event_id = $1, user_id = $2, attending = $3
WHERE following_id = $4
RETURNING event_id, user_id, attending, following_id;
