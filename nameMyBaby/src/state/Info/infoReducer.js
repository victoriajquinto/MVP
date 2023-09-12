import { HANDLE_SET_INFO } from './infoActions.js'

const initialState = {
  info:{
    info: [
      {
          name: "Victoria",
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
  related: {names: ["Amy", "Kathy", "Nathan", "Collin"]}
  }
}

export default function InfoReducer(state = initialState, action) {
  switch(action.type) {
    case HANDLE_SET_INFO:

      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...state,
        info: action.info
      };
      return newState;
    break;
    default:
      return {
        ...state
      }
  }
}