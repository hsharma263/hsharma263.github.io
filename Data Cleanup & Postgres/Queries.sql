SELECT * FROM earthquake;
SELECT * FROM location;
SELECT * FROM time;

SELECT distinct magtype FROM location where country='AL'
SELECT distinct EXTRACT(MONTH FROM time) as MONTH FROM time t;

SELECT latitude,longitude,place,city,county,state,country FROM location where country <>'US'

SELECT latitude,longitude,place,city,county,state,country FROM location where country ='US'


select e.*
from earthquake e, location l
where e.id =l.id
and l.country='AL'
group by l.country

SELECT e.id,e.type,e.depth,e.mag,e.magtype,e.rootmeansquare,e.status,l.latitude, l.longitude, l.city,l.county,l.state,l.country,t.time
FROM earthquake e, location l, time t
WHERE e.id = l.id
and e.id = t.id
and l.country='US'

select count(l.id) as countquakes,min(depth) as mindepth, max(l.depth) as maxdepth, min(l.mag) as minmag, max(l.mag) as maxmag, 
l.country
from location l
group by l.country
order by count(l.id) desc


SELECT e.id,e.mag,l.country,t.time

SELECT DISTINCT l.city
FROM earthquake e, location l, time t
WHERE e.id = l.id
and e.id = t.id
and l.country='US'



