import React, { PropTypes, Component } from 'react'
import TweetLink from './TweetLink'
import TweetText from './TweetText'
import moment from 'moment'
export default class Tweets extends Component {
  render() {

    return (
      <ul className="tweet-list">
        {this.props.tweets.map((tweet, i) =>
          (<li className="tweet" key={i}>
            <TweetText tweet={tweet}/>
            <TweetLink tweet={tweet}/>
            <p id="creation-date"><small>{moment(tweet.created_at).format('YYYY-MM-DD HH:mm')}</small></p>

          </li>)
        )}
      </ul>
    )
  }
}

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired
}
