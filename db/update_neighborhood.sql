UPDATE neighborhood
	SET name=$1, city=$2, state=$3
	WHERE neighborhood_id=$4;
