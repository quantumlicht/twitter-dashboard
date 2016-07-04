import '../styles/app.scss';

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTweetsIfNeeded, invalidateFeed, editLayout, cancelEdit, saveLayoutIfValid } from '../actions/general'
import Picker from '../components/Picker'
import Tweets from '../components/Tweets'
import LayoutEditor from '../components/LayoutEditor'
import { feeds } from '../defaults'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleCancelEditClick = this.handleCancelEditClick.bind(this)
    this.handleLayoutSave = this.handleLayoutSave.bind(this)
  }

  componentDidMount() {
    const { dispatch, tweetsByFeed, layout } = this.props
    for (var feed of feeds) {
      dispatch(fetchTweetsIfNeeded(feed, layout))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, tweetsByFeed, layout } = nextProps
    for (var feed of feeds) {
      dispatch(fetchTweetsIfNeeded(feed, layout))
    }
  }

  handleLayoutSave(nextLayout) {
    const { dispatch, tweetsByFeed, layout } = this.props
    dispatch(saveLayoutIfValid(nextLayout))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, tweetsByFeed, layout } = this.props
    for (var feed of feeds) {
      dispatch(invalidateFeed(feed))
      dispatch(fetchTweetsIfNeeded(feed, layout))
    }
  }

  handleCancelEditClick(e) {
    e.preventDefault()
    const { dispatch, tweetsByFeed, layout } = this.props
    dispatch(cancelEdit())
  }

  handleEditClick(e) {
    e.preventDefault()
    const { dispatch, tweetsByFeed, layout } = this.props
    dispatch(editLayout(layout))

  }

  render() {
    const {tweetsByFeed, layout} = this.props
    console.log('tweetsByFeed', tweetsByFeed)
    // const { selectedFeed, tweets, isFetching, lastUpdated } = this.props
    return (
      <div id ="app-container" className={layout.theme}>
        <div className="row">
          <a className="btn btn-default" href='#'
             onClick={this.handleRefreshClick}>
            Refresh
          </a>
          <a className="btn btn-primary" href='#'
             onClick={this.handleEditClick}>
            Edit Template
          </a>
          {layout.isEditing &&
            <a className="btn btn-default" href='#'
              onClick={this.handleCancelEditClick}>
              Cancel
            </a>
          }
        </div>
        <div className="row">
          {layout.isEditing &&
            <LayoutEditor {...layout} onSave={this.handleLayoutSave}/>
          }
        </div>

        <div className="row">
        {
          Object.entries(tweetsByFeed).map(([title, feed], index)=> (
            <div className={`column column-4 feed-column ${layout.theme}`} key={index}>
            <div className={`row ${layout.theme} feed-header`}>
                <h2 className="feed-title center">{title}</h2>
                {feed.errors && feed.errors.map( (error)=>
                  (<p>{error.message}</p>)
                )}
                <p className="center">
                  {feed.lastUpdated && !feed.error &&
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
              </div>
              <div className="row feed-body">
                {feed.items.length > 0 &&
                  <div style={{ opacity: feed.isFetching ? 0.5 : 1 }}>
                    <Tweets tweets={feed.items} layout={layout} />
                  </div>
                }
              </div>
            </div>)
          )}
        </div>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  // selectedFeed: PropTypes.string.isRequired,
  // tweets: PropTypes.array.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  tweetsByFeed: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  // lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { tweetsByFeed, layout } = state
  // const {
  //   isFetching,
  //   lastUpdated,
  //   items: tweets
  // } = tweetsByFeed[selectedFeed] || {
  //   isFetching: true,
  //   items: []
  // }

  return {
    tweetsByFeed,
    layout
  }
}

export default connect(mapStateToProps)(AsyncApp)
