import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();
// const port = process.env.PORT;

export default function sendTopTen(year, gender) {
  const url = `http://localhost:5173/topten`;
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