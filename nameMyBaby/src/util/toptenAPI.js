import axios from 'axios';
import { PORT } from '../../server/server.js';
// import dotenv from 'dotenv';

// dotenv.config();

export default function sendTopTen(year, gender) {
  const url = `http://localhost:${PORT}/topten`;
  const method = 'get';

  return axios({
    url,
    method,
    params: { year, gender }
  }).then((res) => {
    // console.log('sendTopTen res', res);
    return res.data;
  }).catch(error => {
    console.log('error in sendTopTen', error);
  });

}