import axios from 'axios';

export default function RNG(selected) {
  return axios({
    method: 'get',
    url: 'https://www.behindthename.com/api/random.json',
    params: {
      key: "vi359119907",
      gender: selected,
      usage: 'eng',
      number: 1
    }
  }).then(response => {
    console.log('random name ', name);
    return response.data.names[0];
  }).catch(error => {
    console.log(error);
  });

}