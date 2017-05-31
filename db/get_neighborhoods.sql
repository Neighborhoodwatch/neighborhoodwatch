select * from neighborhood
where
  neighborhood.city like '%$1%' or $1 is null OR
  neighborhood.state like '%$2%' or $2 is null OR
  neighborhood.name like '%$3%' or $3 is null
