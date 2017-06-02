select e.*
from events e
inner join users u
on u.user_id = e.created_by
where e.neighborhood_id=$1
