INSERT INTO neighborhood(name, city, state)
VALUES ($1, $2, $3)
ON CONFLICT (name)
DO NOTHING
RETURNING name, city, state, neighborhood_id;
