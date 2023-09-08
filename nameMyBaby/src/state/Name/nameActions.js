import RNG from '../../util/RNG.js';

export default function handleFetchRandomName(gender) {
 return (dispatch) => {
   RNG(gender)
     .then(name => {
       dispatch(handleSetRandomName(name));
     })
     .catch(error => {
      console.log('error in handleSetName action: ', error)
     });
  }
}

export function handleFetchSpecificName(name){
  return (dispatch) => {

  }

}

export function handleSetRandomName(name) {
  return {
    type: HANDLE_SET_NAME,
    name
  }
}

export const HANDLE_SET_NAME = 'HANDLE_SET_NAME';
