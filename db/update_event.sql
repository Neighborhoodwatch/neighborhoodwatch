UPDATE events
SET details=$1, title=$2, type_id=$3, created_by=$4, event_location_lat=$5, event_location_lon=$6, event_time=$7, photo=$8, event_place=$9, date=$10, neighborhood_id=$11
WHERE event_id=$12
RETURNING (details, title, type_id, created_by, event_location_lat, event_location_lon, event_time, photo, event_place, date, neighborhood_id, event_id)
