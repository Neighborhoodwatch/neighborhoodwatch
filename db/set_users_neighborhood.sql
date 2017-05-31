update users u
  set neighborhood_id=$1
  from neighborhood n
where user_id=$2
returning n.name, n.neighborhood_id, n.state, n.city
