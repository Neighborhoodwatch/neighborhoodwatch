UPDATE users
	SET first_name=$1, last_name=$2, username=$3, email=$4, facebook_id=$5, password=$6, photo=$7
	WHERE user_id=$8
RETURNING first_name, last_name, username, email, facebook_id, photo, user_id, neighborhood_id;
