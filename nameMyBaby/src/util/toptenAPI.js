import axios from 'axios';

export default function sendTopTen(year, gender) {
  const url = `http://127.0.0.1:5173/topten`;
  const method = 'get';
  // console.log('sendAPI arguments', arguments);

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