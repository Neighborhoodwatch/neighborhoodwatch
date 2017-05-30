SELECT f.attending, e.event_id, e.details, e.title, e.date, t.name, e.event_location_lat, e.event_location_lon, e.event_time, e.photo, e.event_place
FROM following f
inner join events e
on f.event_id = e.event_id
inner join type t
on t.type_id = e.type_id
WHERE user_id = $1;
