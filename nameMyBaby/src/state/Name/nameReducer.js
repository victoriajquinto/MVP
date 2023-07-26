
import { HANDLE_SET_NAME } from './nameActions.js'

export default function NameReducer(state = {name: 'Vicky'}, action) {

  switch(action.type) {
    case HANDLE_SET_NAME:
      console.log('Previous state:', state);
      console.log('Action:', action);
      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...state,
        name: action.name
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
