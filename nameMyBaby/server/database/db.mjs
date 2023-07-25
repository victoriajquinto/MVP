import pgPromise from 'pg-promise';

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'baby',
  user: 'postgres',
  password: 'password'
};

const pgp = pgPromise({});
const db = pgp('postgres://postgres:password@localhost:5432/baby')

export { db, pgp };