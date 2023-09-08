import axios from 'axios';

export function executeRequest(name, endpoint) {
  // console.log('execute request called with endpoint: ', endpoint);
  const url = 'https://www.behindthename.com/api' + endpoint;
  // console.log(url);
  const method = 'get';
  const params = {
    key: import.meta.env.VITE_BTN_API_KEY,
    name: name,
  }

  return axios({
    url,
    method,
    params
  }).then((res) => {
    // console.log('executeRequest res', res);
    return res.data;
  }).catch(error => {
    console.log('error in executeRequest', error);
  });

}


export default async function fetchNameInfo(name){
  try {
    // console.log('fetchNameInfo called');
    const info = await executeRequest(name, "/lookup.json");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const related = await executeRequest(name, '/related.json');
    return {info, related };
  } catch (error) {
    console.log('error in getNameInfo: ', error);
  }
}