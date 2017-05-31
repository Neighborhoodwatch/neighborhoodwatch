UPDATE type
	SET name=$1,
	set isscheduled=$2
	WHERE type_id=$3;
