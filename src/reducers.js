import { combineReducers } from 'redux'
import { ADD_WINE, TOGGLE_WINE, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function wines(state = [], action) {
  switch (action.type) {
    case ADD_WINE:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: state.length
        }
      ]
    case TOGGLE_WINE:
      return state.map((wine, index) => {
        if (index === action.index) {
          return Object.assign({}, wine, {
            completed: !wine.completed
          })
        }
        return wine
      })
    default:
      return state
  }
}

const wineApp = combineReducers({
  visibilityFilter,
  wines
})

export default wineApp
