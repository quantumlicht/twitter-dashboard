import React, { Component, PropTypes } from 'react'
import { feeds, themes } from '../defaults'
import { Picker } from './Picker'

class LayoutEditor extends Component {
  constructor(props){
    super(props)
    this.state = {...this.props}
    this.handleTweetLimitChange = this.handleTweetLimitChange.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
    this.handleFeedOrderChange = this.handleFeedOrderChange.bind(this)
  }

  handleTweetLimitChange(event) {
    this.setState({tweetLimit: parseInt(event.target.value)})
  }

  handleThemeChange(theme) {
    this.setState({theme: theme})
  }

  handleFeedOrderChange(feed){
    console.log('handleFeedOrderChange', feed)
  }

  render() {
    const { isEditing, tweetLimit, columnsOrder, theme,  onSave, onCancel} = this.props
    return (
      <div id="layout-editor">
        <div className="row">
          <label for="limit">Tweet Limit</label>
          <input type="number" id="limit" onChange={this.handleTweetLimitChange } value={this.state.tweetLimit} min="0"/>
        </div>
        <div className="row">
          <label for="picker">Theme</label>
          <Picker id="picker" value={this.state.theme} onChange={this.handleThemeChange} options={themes} />
        </div>
        <div className="row">
          <a className="btn btn-primary" href="#" onClick={e=> {onSave(this.state)}}>Save</a>
          <a className="btn btn-default" href='#' onClick={e=> onCancel(e)}>Cancel</a>
        </div>
      </div>
    )
  }
}

LayoutEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  tweetLimit: PropTypes.number.isRequired,
  columnsOrder: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default LayoutEditor
