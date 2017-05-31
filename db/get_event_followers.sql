SELECT attending, username, first_name, last_name, u.user_id, event_id 
FROM following f
inner join users u on u.user_id = f.user_id
WHERE event_id = $1;
