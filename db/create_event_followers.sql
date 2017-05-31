insert into following (event_id, user_id, attending)
values ($1, $2, $3)
RETURNING event_id, user_id, attending, following_id
