import axios from 'axios';

export default function sendTopTen(gender) {
  const url = `http://127.0.0.1:5173/topten`;
  const method = 'get';
  console.log('sendAPI arguments', arguments);

  return axios({
    url,
    method,
    params: {
      gender: gender
    }
  }).then((res) => {
    console.log('sendAPI res', res);
    return res.data;
  }).catch(error => {
    console.log('error in sendAPI', error);
  });

}