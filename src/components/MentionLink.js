import React, { PropTypes } from 'react'

const MentionLink = ({user}) => {
  let route = `http://twitter.com/${user}`
  return (
    <a className="link" href={route}>
       @{user}
    </a>
  )
}

MentionLink.propTypes = {
  user: PropTypes.string.isRequired,
}
export default MentionLink
