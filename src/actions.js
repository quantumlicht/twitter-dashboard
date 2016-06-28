/*
 * action types
 */

export const ADD_WINE = 'ADD_WINE'
export const TOGGLE_WINE = 'TOGGLE_WINE'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addWine(text) {
  return { type: ADD_WINE, text }
}

export function toggleWine(index) {
  return { type: TOGGLE_WINE, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
