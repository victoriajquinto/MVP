/* shell command:  \i /users/victoriajquinto/Desktop/hr/MVP/rfp2305-mvp/nameMyBaby/server/database/schema.sql; */
/c baby;
DROP TABLE popularity;

CREATE TABLE popularity (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  gender varchar(10),
  year INTEGER,
  count INTEGER
);