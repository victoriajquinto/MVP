export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';

export function addFav(name) {
  return {
    type: ADD_FAV,
    name
  }
}

export function removeFav(name) {
  return {
    type: REMOVE_FAV,
    name
  }
}