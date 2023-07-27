import {ADD_FAV, REMOVE_FAV} from './favActions.js'

export default function FavReducer(state = [], action) {
  switch(action.type) {
    case ADD_FAV:
      // eslint-disable-next-line no-case-declarations
      return [
        ...state,
        name
      ];
    break;
  case REMOVE_FAV:
    return state.filter((name) => {
      !name
    });
    break;
  default:
    return state;
  }
}