import '../styles/app.scss';

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectFeed, fetchTweetsIfNeeded, invalidateFeed } from '../actions'
import Picker from '../components/Picker'
import Tweets from '../components/Tweets'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedFeed } = this.props
    dispatch(fetchTweetsIfNeeded(selectedFeed))
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
    dispatch(invalidateFeed(selectedFeed))
    dispatch(fetchTweetsIfNeeded(selectedFeed))
  }

  render() {
    const { selectedFeed, tweets, isFetching, lastUpdated } = this.props
    return (
      <div>
      <Picker value={selectedFeed}
               onChange={this.handleChange}
               options={[ 'appdirect', 'laughingsquid', 'techcrunch', 'radialpoint']} />
      <p>
         {lastUpdated &&
           <span>
             Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
             {' '}
           </span>
         }
         {!isFetching &&
           <a href='#'
              onClick={this.handleRefreshClick}>
             Refresh
           </a>
         }
       </p>
       {isFetching && tweets.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && tweets.length === 0 &&
          <h2>Empty.</h2>
        }
        {tweets.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Tweets tweets={tweets} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedFeed: PropTypes.string.isRequired,
  tweets: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
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
    selectedFeed,
    tweets,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
