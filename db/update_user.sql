UPDATE users
	SET first_name=$1, last_name=$2, username=$3, email=$4, photo=$5, neighborhood_id=$6
	WHERE user_id=$7
RETURNING first_name, last_name, username, email, photo, user_id, neighborhood_id;
