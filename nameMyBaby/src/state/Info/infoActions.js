import fetchNameInfo from '../../util/api.js';

export default function handleFetchInfo(name) {
  // console.log('handleFetchInfo called with name:', name);
  return (dispatch) => {
    fetchNameInfo(name)
     .then(info => {
      // console.log('info in handleFetchInfo', info);
       dispatch(handleSetInfo(info));
     })
     .catch(error => {
      console.log('error in handleSetName action: ', error)
     });
  }
}

export function handleSetInfo(info) {
  return {
    type: HANDLE_SET_INFO,
    info
  }
}

export const HANDLE_SET_INFO = 'HANDLE_SET_INFO';
