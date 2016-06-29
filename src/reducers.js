import { combineReducers } from 'redux'
import {
  SELECT_FEED, INVALIDATE_FEED,
  REQUEST_TWEETS, RECEIVE_TWEETS
} from './actions'

function selectedFeed(state = 'appdirect', action) {
  switch (action.type) {
  case SELECT_FEED:
    return action.feed
  default:
    return state
  }
}

function tweets(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_FEED:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_TWEETS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_TWEETS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.tweets,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function tweetsByFeed(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_FEED:
    case RECEIVE_TWEETS:
    case REQUEST_TWEETS:
      return Object.assign({}, state, {
        [action.feed]: tweets(state[action.feed], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tweetsByFeed,
  selectedFeed
})

export default rootReducer
