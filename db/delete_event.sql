-- DELETE FROM following
-- WHERE event_id =$1;
DELETE FROM events
WHERE event_id=$1;
