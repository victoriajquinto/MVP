import pgPromise from 'pg-promise';

const pgp = pgPromise({});
const db = pgp('postgres://postgres:password@localhost:5432/baby')

export { db, pgp };