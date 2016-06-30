import React, { PropTypes, Component } from 'react'

export default class FeedColumn extends Component {
  render() {
    return (
      <ul className="tweet-list">
        {this.props.tweets.map((tweet, i) =>
          <li className="tweet" key={i}>
            {tweet.text}
            {tweet.created_at}
          </li>
        )}
      </ul>
    )
  }
}

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired
}
