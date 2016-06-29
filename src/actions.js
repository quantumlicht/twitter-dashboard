/*
 * action types
 */
 import fetch from 'isomorphic-fetch'

export const REQUEST_TWEETS = 'REQUEST_TWEETS'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const SELECT_FEED = 'SELECT_FEED'
export const INVALIDATE_FEED = 'INVALIDATE_FEED'
/*
 * other constants
 */

/*
 * action creators
 */
 export function selectFeed(feed) {
   return {
     type: SELECT_FEED,
     feed
   }
 }

export function invalidateFeed(feed) {
   return {
     type: INVALIDATE_FEED,
     feed
   }
 }

function requestTweets(feed) {
   return {
     type: REQUEST_TWEETS,
     feed
   }
}

function receiveTweets(feed, json) {
   return {
     type: RECEIVE_TWEETS,
     feed,
     tweets: json,
     receivedAt: Date.now()
   }
 }

function fetchTweets(feed) {
   return dispatch => {
     dispatch(requestTweets(feed))
     return fetch(`http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=${feed}`)
       .then(response => response.json())
       .then(json => dispatch(receiveTweets(feed, json)))
   }
}

function shouldFetchTweets(state, feed) {
  const tweets = state.tweetsByFeed[feed]
  if (!tweets) {
    return true
  } else if (tweets.isFetching) {
    return false
  } else {
    return tweets.didInvalidate
  }
}

export function fetchTweetsIfNeeded(feed) {
  return (dispatch, getState) => {
    if (shouldFetchTweets(getState(), feed)) {
      return dispatch(fetchTweets(feed))
    }
  }
}
