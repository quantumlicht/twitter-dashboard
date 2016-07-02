import { combineReducers } from 'redux'
import { feeds, tweetLimit, theme } from './defaults'
import {
  SELECT_FEED, INVALIDATE_FEED,
  REQUEST_TWEETS, RECEIVE_TWEETS,
  EDIT_LAYOUT, REQUEST_SAVE_LAYOUT, CANCEL_EDIT, SAVED_LAYOUT ,
  FETCH_ERROR
} from './actions/general'
import { FORM_UPDATE_VALUE, FORM_RESET } from './actions/form'


function getCurrentLayout(){
  return JSON.parse(localStorage.getItem('layout')) ||
   {columnsOrder: feeds, tweetLimit: tweetLimit, theme: theme}
}


function selectedFeed(state = 'appdirect', action) {
  switch (action.type) {
  case SELECT_FEED:
    return action.feed
  default:
    return state
  }
}

const initialState = {}
function form(state = initialState, action) {
  switch (action.type) {
    case FORM_UPDATE_VALUE:
      return {...state, values: {...state.values, [action.name]: action.value}}
    case FORM_RESET:
      return initialState
    default:
      return state
  }
}

function layout(state = {isEditing: false, ...getCurrentLayout()}, action) {
  switch(action.type) {
    case EDIT_LAYOUT:
      return {...state, isEditing:true}
    case REQUEST_SAVE_LAYOUT:
      return {...state, ...action.layout, isEditing: false }
    case SAVED_LAYOUT:
        return state
    case CANCEL_EDIT:
      return {...state, isEditing:false}
    default:
      return state
  }
}


function tweets(state = {
  isFetching: false,
  didInvalidate: false,
  error: undefined,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_FEED:
      return { ...state, didInvalidate: true }
    case REQUEST_TWEETS:
      return { ...state, isFetching: true, didInvalidate: false}
    case RECEIVE_TWEETS:
      return {...state,
        isFetching: false,
        didInvalidate: false,
        items: action.tweets,
        lastUpdated: action.receivedAt,
        error: undefined
      }
    case FETCH_ERROR:
      return {...state, isFetching:false, errors: actions.errors}
    default:
      return state
  }
}

function tweetsByFeed(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_FEED:
    case RECEIVE_TWEETS:
    case REQUEST_TWEETS:
    case FETCH_ERROR:
      return {...state,
        [action.feed]: tweets(state[action.feed], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tweetsByFeed,
  layout
})

export default rootReducer
