import { HANDLE_SET_INFO } from './infoActions.js'

export default function InfoReducer(state = {}, action) {
  switch(action.type) {
    case HANDLE_SET_INFO:
      // console.log('Previous state:', state);
      // console.log('Action:', action);
      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...state,
        info: action.info
      };
      console.log('New state:', newState);
      return newState;
    break;
    default:
      return {
        ...state
      }
  }
}