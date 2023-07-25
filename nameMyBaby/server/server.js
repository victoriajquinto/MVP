import express from 'express';
import morgan from 'morgan';
const port = 5173;

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.listen(port, () => {
  console.log("server listening on port", port);
});