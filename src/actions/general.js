/*
 * action types
 */
 import fetch from 'isomorphic-fetch'

export const REQUEST_TWEETS = 'REQUEST_TWEETS'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const SELECT_FEED = 'SELECT_FEED'
export const INVALIDATE_FEED = 'INVALIDATE_FEED'
export const EDIT_LAYOUT = 'EDIT_LAYOUT'
export const CANCEL_EDIT = 'CANCEL_EDIT'
export const REQUEST_SAVE_LAYOUT = 'REQUEST_SAVE_LAYOUT'
export const SAVED_LAYOUT = 'SAVED_LAYOUT'
export const FETCH_ERROR = 'FETCH_ERROR'

/*
 * action creators
 */
 export function selectFeed(feed) {
   return {
     type: SELECT_FEED,
     feed
   }
 }

export function editLayout(layout) {
  return {
    type: EDIT_LAYOUT,
    layout
  }
}

export function cancelEdit(layout) {
  return {
    type: CANCEL_EDIT,
    layout
  }
}

function requestSave(layout) {
  return {
    type: REQUEST_SAVE_LAYOUT,
    layout
  }
}

function isLayoutValid(layout) {
  //TODO: Add validation
  return true
}

function layoutDidSave(layout) {
  console.log('layoutDidSave', layout)
  localStorage.setItem('layout', JSON.stringify({...layout, isEditing:false}))
  return {
    type: SAVED_LAYOUT
  }
}


export function saveLayoutIfValid(layout) {

  return dispatch => {
    //TODO: do validation
    dispatch(requestSave(layout))
    if (isLayoutValid(layout)) {
      return dispatch(layoutDidSave(layout))
    }
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
   if (json.errors) {
     return {
       type: FETCH_ERROR,
       errors: json.errors,
       feed
     }
   }
   return {
     type: RECEIVE_TWEETS,
     feed,
     tweets: json,
     receivedAt: Date.now()
   }
 }

 function handleFetchError(feed, errors) {
   return {
     type:FETCH_ERROR,
     errors,
     feed
   }
 }

function fetchTweets(feed, count) {
   return dispatch => {
     dispatch(requestTweets(feed))
     return fetch(`http://localhost:7890/1.1/statuses/user_timeline.json?count=${count}&screen_name=${feed}`)
       .then(response => response.json())
       .then(json => dispatch(receiveTweets(feed, json)))
       .catch(err => dispatch(handleFetchError(feed, [err])))
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

export function fetchTweetsIfNeeded(feed, layout) {
  return (dispatch, getState) => {
    if (shouldFetchTweets(getState(), feed)) {
      return dispatch(fetchTweets(feed, layout.tweetLimit))
    }
  }
}
