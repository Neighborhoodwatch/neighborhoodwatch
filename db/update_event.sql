UPDATE events
	SET  lat=$1, lon=$2, details=$3, title=$4, date=$5, type_id=$6, created_by=$7, event_location_lat=$8, event_location_lon=$9, event_time=$10, photo=$11, neighborhood_id=$12
	WHERE event_id=$13
RETURNING (details, title, type_id, created_by, event_location_lat, event_location_lon, event_time, photo, event_place, date, neighborhood_id, event_id)
