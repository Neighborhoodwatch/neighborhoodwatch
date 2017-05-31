INSERT INTO events (details, title, type_id, created_by, event_location_lat, event_location_lon, event_time, photo, event_place, date, neighborhood_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING details, title, type_id, created_by, event_location_lat, event_location_lon, event_time, photo, event_place, date, neighborhood_id, event_id
