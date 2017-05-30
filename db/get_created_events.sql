SELECT e.event_id, e.details, e.title, e.date, t.name, e.event_location_lat, e.event_location_lon, e.event_time, e.photo, e.event_place
FROM events e
inner join type t
on e.type_id = t.type_id
WHERE created_by = $1;
