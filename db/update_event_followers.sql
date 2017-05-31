UPDATE following
SET event_id = $1, attending = $3
WHERE user_id = $2
RETURNING event_id, user_id, attending, following_id
