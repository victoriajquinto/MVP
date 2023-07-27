import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import NameReducer from './name/NameReducer.js';
import InfoReducer from './Info/infoReducer.js';
import FavReducer from './Favorites/favReducer.js'

const rootReducer = combineReducers({
  name: NameReducer,
  info: InfoReducer,
  fav: FavReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export function getStoreWithState(preloadedState = {}) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );
}
