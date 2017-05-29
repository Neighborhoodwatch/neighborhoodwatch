INSERT INTO events (details, title, type_id, created_by, event_location_lat, event_location_lon, event_time, photo, date, neighborhood_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
-- make sure to add neighborhood_id back and $10
