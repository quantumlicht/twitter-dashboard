import React, { PropTypes } from 'react'

const TweetLink = ({tweet}) => {
  console.log('tweet', tweet)
  let route = `http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
  return (
    <a className="link" href={route}>
       Twitter Link
    </a>
  )
}

TweetLink.propTypes = {
  tweet: PropTypes.object.isRequired,
}

export default TweetLink
