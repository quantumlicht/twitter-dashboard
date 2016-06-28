import React, { PropTypes } from 'react'
import Wine from './Wine'

const WineList = ({ wines, onWineClick }) => (
  <ul>
    {wines.map(wine =>
      <Wine
        key={wine.id}
        {...wine}
        onClick={() => onWineClick(wine.id)}
      />
    )}
  </ul>
)

WineList.propTypes = {
  wines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onWineClick: PropTypes.func.isRequired
}

export default WineList
