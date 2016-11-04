import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'
import _ from 'lodash'

import {
  dropTrack
} from '../Release/ReleaseActions'
import getAudioMetadata from './MetadataHelper'

export class DNDAudioContainer extends React.Component {
	constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    // TODO: click dnd open file input
    // TODO: debounce for dragover
    // this.debounceDragOver = _.debounce( (funct, e) => {
    //   console.log('blahhh')
    //   funct.bind(this, e)()
    // }, 50)

    this.state = {
      'dropped': false,
      'active': false
    }
	}

  onDragOver(e) {
    console.log('DRAG OVER')
    e.preventDefault()
    e.stopPropagation()
    this.setState({'active': true})
  }

  onDragLeave(e) {
    console.log('DRAG LEAVE')
    e.preventDefault()
    e.stopPropagation()
    this.setState({'active': false})
  }

  onDrop(e) {
    e.preventDefault()
    e.stopPropagation()

    var file = e.dataTransfer.files[0]
    var fileTypeAudio = file.type === 'audio/mpeg' || file.type === 'audio/mp3'
    var fileSizeAcceptable = file.size < 20971520 // 20 MB

    if (fileTypeAudio && fileSizeAcceptable) {
      this.setState({
        'active': false,
        'dropped': true
      })

      getAudioMetadata(file)
        .then(meta => { this.props.dropTrack(file, meta, this.props.index) })
        .catch(err => console.log('ISSUES BUD'))
    }
  }

  render () {
    var classes = classNames({
      'drag-container': true,
      'active': this.state.active,
      'hidden': this.state.dropped
    })

    return (
      <div
        className={classes}
        onDragOver={e => this.onDragOver(e)}
        onDragLeave={e => this.onDragLeave(e)}
        onDrop={e => this.onDrop(e)}
      >
      </div>
    )
  }

}

function mapStateToProps (state, props) {
  return { }
}

export default connect(
  mapStateToProps,
  { dropTrack }
)(DNDAudioContainer)