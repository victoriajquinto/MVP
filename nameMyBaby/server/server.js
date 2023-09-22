import express from 'express';
import morgan from 'morgan';
import {db} from './database/db.mjs';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
const port = process.env.PORT;
const MODE = process.env.NODE_ENV;


async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p);

  app.use(
    (await import('serve-static')).default(resolve('dist/client'), {
      index: false,
    }),
  )

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
      // @ts-ignore
      let render = (await import('./dist/server/entry-server.js')).render;

      const appHtml = render(url);
      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })
  return app;
}



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
    const queryString = 'SELECT * FROM favorites'
    const data = await db.query(queryString);
    res.status(200).send(data);

  } catch (error) {
    console.error('Server error getting favorites:', error.message);
    res.status(400).send('Server error getting favorites:');
  }
});

app.post('/favorites', async (req, res) => {
  const name = req.body.name;
  const gender = req.body.gender;
  try {
    const values = [name, gender];
    console.log(values);
    const queryString = 'INSERT INTO favorites (name, gender) VALUES ($1, $2)';
    await db.query(queryString, values);
    res.status(201).send(`${name} inserted successfully`); //TODO
  } catch (error) {
    console.error('Server error posting name to favorites:', error.message);
    res.status(401).send('Server error posting name to favorites');
  }
});

app.delete('/favorites/:name/:gender', async (req, res) => {
  const name = req.params.name;
  const gender = req.params.gender;
  console.log('name and gender: ', name, gender);
  try {
    const values = [name, gender];
    const queryString = 'DELETE FROM favorites WHERE (name = $1 AND gender = $2)';
    const data = await db.query(queryString, values);
    res.status(200).send(`successfully deleted ${name}. Data: ${data}`);
  } catch (error) {
    console.error('Server error deleting name from favorites:', error.message);
    res.status(401).send('Server error deleting name from favorites');

  }
});

// app.listen(port, () => {
//   console.log("server listening on port", port);
// });

createServer()
  .then((app) =>
    app.listen(port, () => {
      console.log(`express server live and listening on http://localhost:${port}`)
    }),
  )