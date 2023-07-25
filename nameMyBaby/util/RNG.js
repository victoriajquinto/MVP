import axios from 'axios';

export default function RNG(selected) {
  axios({
    method: 'get',
    url: 'https://www.behindthename.com/api/random.json',
    params: {
      key: "vi359119907",
      usage: 'eng',
      gender: selected,
      number: 1
    }
  }).then(response => {
    console.log('RNG axios response: ', response);
  }).catch(error => {
    console.log(error);
  })
}