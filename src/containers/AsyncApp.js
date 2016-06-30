import '../styles/app.scss';

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectFeed, fetchTweetsIfNeeded, invalidateFeed } from '../actions'
import Picker from '../components/Picker'
import Tweets from '../components/Tweets'

const feeds = [ 'appdirect', 'laughingsquid', 'techcrunch', 'radialpoint'];
class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedFeed } = this.props
    for (var feed of feeds) {
      dispatch(fetchTweetsIfNeeded(feed))
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFeed !== this.props.selectedFeed) {
      const { dispatch, selectedFeed } = nextProps
      dispatch(fetchTweetsIfNeeded(selectedFeed))
    }
  }

  handleChange(nextFeed) {
    this.props.dispatch(selectFeed(nextFeed))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedFeed } = this.props
    for (var feed of feeds) {
      dispatch(invalidateFeed(feed))
      dispatch(fetchTweetsIfNeeded(feed))
    }

  }

  render() {
    const {tweetsByFeed} = this.props
    // const { selectedFeed, tweets, isFetching, lastUpdated } = this.props
    return (
      <div>
          <a href='#'
             onClick={this.handleRefreshClick}>
            Refresh
          </a>

      {
        Object.entries(tweetsByFeed).map(([title, feed])=>
          (<div>
          <h2>{title}</h2>
          <p>
             {feed.lastUpdated &&
               <span>
                 Last updated at {new Date(feed.lastUpdated).toLocaleTimeString()}.
                 {' '}
               </span>
             }
           </p>
           {feed.isFetching && feed.items.length === 0 &&
              <h2>Loading...</h2>
            }
            {!feed.isFetching && feed.items.length === 0 &&
              <h2>Empty.</h2>
            }
            {feed.items.length > 0 &&
              <div style={{ opacity: feed.isFetching ? 0.5 : 1 }}>
                <Tweets tweets={feed.items} />
              </div>
            }
          </div>)
        )}
    </div>

    )
  }
}

AsyncApp.propTypes = {
  // selectedFeed: PropTypes.string.isRequired,
  // tweets: PropTypes.array.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  tweetsByFeed: PropTypes.object.isRequired,
  // lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedFeed, tweetsByFeed } = state
  const {
    isFetching,
    lastUpdated,
    items: tweets
  } = tweetsByFeed[selectedFeed] || {
    isFetching: true,
    items: []
  }

  return {
    tweetsByFeed
  }
}

export default connect(mapStateToProps)(AsyncApp)
