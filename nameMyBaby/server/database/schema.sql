/* shell command:  \i /users/victoriajquinto/Desktop/hr/MVP/rfp2305-mvp/nameMyBaby/server/database/schema.sql; */
/c baby;
DROP TABLE popularity;

CREATE TABLE popularity (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  gender VARCHAR(10),
  year INTEGER,
  count INTEGER
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  gender VARCHAR(10)
);