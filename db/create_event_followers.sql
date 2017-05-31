insert into following (event_id, user_id, attending)
values ($1, $2, $3)
returning following (event_id, user_id, attending, following_id)
