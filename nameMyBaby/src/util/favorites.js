import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000/'

export function postFavorite(name, gender) {
  return axios.post('/favorites', {
    name: name,
    gender: gender
  }).then((response) => {
    console.log(response.data);
    return response.data;
  }).catch((error) => {
    console.log('error in util/postFavorites: ', error.message);
  });
}

export function getFavorites(){
  return axios.get('/favorites')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error in util/getFavorites: ", error.message)})
}

export function deleteFavorite(name, gender){
  console.log('util/deleteFavorite called with: ', name, gender);

  return axios.delete(`/favorites/${name}/${gender}`, {
    name: name,
    gender: gender
  }).then((response) => {
      console.log(response.data);
  }).catch((error) => {
     console.log('error in util/deleteFavorite: ', error.message);
  })

}