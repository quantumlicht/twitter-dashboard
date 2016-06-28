import { connect } from 'react-redux'
import { toggleWine } from '../actions'
import WineList from '../components/WineList'

const getVisibleWines = (wines, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return wines
    case 'SHOW_COMPLETED':
      return wines.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return wines.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    wines: getVisibleWines(state.wines, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onWineClick: (id) => {
      dispatch(toggleWine(id))
    }
  }
}

const VisibleWineList = connect(
  mapStateToProps,
  mapDispatchToProps
)(WineList)

export default VisibleWineList
