import React, { PropTypes } from 'react'
import MentionLink from './MentionLink'
const TweetText = ({tweet}) => {
    if (!tweet.entities.user_mentions.length){
      return <p>{tweet.text}</p>
    }
    else {
      let tweetFragments = [], idx=0, namePos
      tweet.entities.user_mentions.forEach( (userMention)=> {
        namePos = tweet.text.toLowerCase().indexOf(userMention.screen_name.toLowerCase()) - 1 // -1 to exclude @
        tweetFragments.push(tweet.text.substring(idx, namePos))
        tweetFragments.push(<MentionLink user={userMention.screen_name}/>)
        idx = namePos + userMention.screen_name.length + 1
      })
      tweetFragments.push(tweet.text.substr(idx))
      return (
        <p>
          {tweetFragments.map((fragment, idx)=>
              (<span key={idx}>
                {fragment}
              </span>)
          )}
        </p>
      )}
}

TweetText.propTypes = {
  tweet: PropTypes.object.isRequired,
}

export default TweetText
