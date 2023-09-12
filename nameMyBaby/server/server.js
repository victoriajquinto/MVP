import express from 'express';
import morgan from 'morgan';
import {db} from './database/db.mjs';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

//ROUTES

app.get('/hi', (req, res) => {
  res.send('Hello from Express!').status(200);
});

app.get('/popularity', async(req, res) => {
  try{
    const name = req.query.name || "Victoria";
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

app.get('/wiki-proxy', async (req, res) => {
  const pageTitle = req.query.title;
  console.log('Requesting Wikipedia page:', pageTitle);
  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exintro: '',
        explaintext: '',
        titles: pageTitle,
      },
    });

    const pageId = Object.keys(response.data.query.pages)[0];
    const summary = response.data.query.pages[pageId].extract;
    res.status(200).send(summary);
  } catch (error) {
    console.error('Error fetching Wikipedia:', error.message);
    res.status(400).send(error.message);
  }
});

app.get('/wiki-given-names', async (req, res) => {
  const title = req.query.title;
  const wikipediaURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

  try {
    const response = await axios.get(wikipediaURL);
    const html = response.data;
    res.send(html);
  } catch (error) {
    console.error('Error fetching the Wikipedia page:', error.message);
    res.status(500).send('Error fetching the Wikipedia page.');
  }
});

app.get('/favorites', async (req, res) => {
  try {
    const gender = req.query.gender;
    const queryString = 'SELECT * FROM favorites WHERE gender = $1'
    const data = await db.query(queryString, [gender]);
    res.status(200).send(data);

  } catch (error) {
    console.error('Server error getting favorites:', error.message);
    res.status(400).send('Server error getting favorites:');
  }
});

app.post('favorites', async (req, res) => {
  try {
    const name = req.query.name; //TODO: check if req.query or req.params
    const gender = req.query.gender; //TODO: check if req.query or req.params
    const queryString = 'EDIT ME'; //TODO: google postgres command to insert into favorites table
    const data = await db.query(queryString, [gender]);
    res.status(201).send(data); //TODO
  } catch (error) {
    console.error('Server error posting name to favorites:', error.message);
    res.status(401).send('Server error posting name to favorites');
  }
});

app.listen(port, () => {
  console.log("server listening on port", port);
});