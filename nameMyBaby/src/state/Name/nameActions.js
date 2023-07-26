import RNG from '../../util/RNG.js';

export default function handleFetchName(gender) {
 return (dispatch) => {
   RNG(gender)
     .then(name => {
       dispatch(handleSetName(name));
      //  console.log(name)
     })
     .catch(error => {
      console.log('error in handleSetName action: ', error)
     });
  }
}

export function handleSetName(name) {
  return {
    type: HANDLE_SET_NAME,
    name
  }
}

export const HANDLE_SET_NAME = 'HANDLE_SET_NAME';
