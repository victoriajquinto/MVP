import { HANDLE_SET_INFO } from './infoActions.js'

const initialState = {
  info:{
    info: [
      {
          name: "Vicky",
          gender: "f",
          usages: [
              {
                  usage_code: "eng",
                  usage_full: "English",
                  usage_gender: "f"
              }
          ]
      }
  ],
  related: {names: ["Amy", "Kathy"]}
  }
}

export default function InfoReducer(state = initialState, action) {
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