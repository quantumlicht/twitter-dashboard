import Component, {PropTypes} from 'react';

class From extends Component {
  displayName: 'Form',


  render() {
    return (
      <form>
        {this.props.children}
      </form>
    );
  }
}

Form.propTypes = {
    children: PropTypes.node,
    values: PropTypes.object,
    update: PropTypes.func,
    reset: PropTypes.func,
    onSubmit: PropTypes.func
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
