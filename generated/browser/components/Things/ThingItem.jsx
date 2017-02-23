import React from 'react'

const ThingItem = ({name}) => {
  return (
    <div className='two columns'>{name}</div>
  )
}

ThingItem.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default ThingItem