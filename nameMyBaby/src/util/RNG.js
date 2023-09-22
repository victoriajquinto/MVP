import axios from 'axios';

export default function RNG(selected) {
  return axios({
    method: 'get',
    url: 'https://www.behindthename.com/api/random.json',
    params: {
      key: import.meta.env.VITE_BTN_API_KEY,
      gender: selected,
      usage: 'eng',
      number: 1
    }
  }).then(response => {
    return response.data.names[0];
  }).catch(error => {
    console.log(error);
  });

}