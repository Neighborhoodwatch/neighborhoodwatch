SELECT n.neighborhood_id, n.name, n.city, n.state
FROM neighborhood n
inner join users u
on u.neighborhood_id = n.neighborhood_id
where u.user_id = $1;
