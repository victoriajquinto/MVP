import axios from 'axios';

export default function popularity(name) {
  const url = `http://127.0.0.1:3000/popularity`;
  const method = 'get';
  console.log('sendAPI arguments', arguments);

  return axios({
    url,
    method,
    params: { name }
  }).then((res) => {
    // console.log('popularity res', res);
    return res.data;
  }).catch(error => {
    console.log('error in popularity', error);
  });

}

// http://127.0.0.1:5173/popularity?name=Lars
// http://localhost:5173/popularity?name=Lars