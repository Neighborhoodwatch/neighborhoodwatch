UPDATE public.events
	SET  lat=$1, lon=$2, details=$3, title=$4, date=$5, type_id=$6, created_by=$7, event_location_lat=$8, event_location_lon=$9, event_time=$10, photo=$11, neighborhood_id=$12
	WHERE event_id=$13;
