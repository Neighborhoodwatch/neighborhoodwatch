UPDATE users
	SET first_name=$1, last_name=$2, username=$3, email=$4, facebook_id=$5, google_id=$6, password=$7, photo=$8
	WHERE user_id=$9;
