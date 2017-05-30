INSERT INTO neighborhood(name, city, state)
VALUES ($1, $2, $3)
ON CONFLICT (name, city, state)
DO UPDATE SET name = $1, city = $2, state = $3
RETURNING name, city, state, neighborhood_id;