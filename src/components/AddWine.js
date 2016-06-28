import React from 'react'
import { connect } from 'react-redux'
import { addWine } from './actions'

let AddWine = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addWine(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Wine
        </button>
      </form>
    </div>
  )
}
AddWine = connect()(AddWine)

export default AddWine
