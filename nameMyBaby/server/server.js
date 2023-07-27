import express from 'express';
import morgan from 'morgan';
import {db} from './database/db.mjs';
import cors from 'cors';
const port = 3000;

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//ROUTES

app.get('/hi', (req, res) => {
  res.send('Hello from Express!').status(200);
});

app.get('/popularity', async(req, res) => {
  try{
    const name = req.query.name || "Vicky";
    const queryString = 'SELECT year, count FROM popularity WHERE name = $1';
    const data = await db.query(queryString, [name])
    res.status(200).send(data);
  } catch (error) {
    console.log('error in pop get request', error);
    res.status(400).send(error);
  }
});

app.get('/topten', async(req, res) => {
  try {
    const year = parseInt(req.query.year);
    const gender = req.query.gender.toUpperCase();
    const params = [year, gender];
    console.log('req in topten server path', req.query);
    const queryString = 'SELECT name FROM popularity WHERE (year = $1 AND gender = $2) ORDER BY count DESC LIMIT 10;';
    const data = await db.query(queryString, params);
    res.status(200).send(data);
  } catch (error) {
    console.log('error in pop get request', error);
    res.status(400).send(error);
  }

});

app.listen(port, () => {
  console.log("server listening on port", port);
});