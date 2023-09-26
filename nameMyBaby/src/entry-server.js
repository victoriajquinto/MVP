import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './components/App.jsx'; // Replace with your React application component
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

// Serve static assets
app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  const context = {};

  const appHtml = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const templatePath = path.resolve(__dirname, '../dist/client/index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');
  const html = template.replace('<!--app-html-->', appHtml);

  res.status(200).send(html);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});