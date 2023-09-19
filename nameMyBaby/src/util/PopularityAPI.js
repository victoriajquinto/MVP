import axios from 'axios';

export default function popularity(name) {
  const url = `http://127.0.0.1:3000/popularity`;
  const method = 'get';

  return axios({
    url,
    method,
    params: { name }
  }).then((res) => {
    // console.log('popularity res', res);
    let result = res.data;
    result.sort(function(a,b){
      let yearA = a.year;
      let yearB = b.year;
      if(yearA > yearB){
        return 1
      } else if (yearB > yearA) {
        return -1;
      }
    })
    return result;
  }).catch(error => {
    console.log('error in popularity', error);
  });

}
