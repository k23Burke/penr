import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import DNDAudioContainer from './DNDAudioContainer'
import TrackUploadForm from './TrackUploadForm'
import {
  dropTrack,
  updateDuration,
  trackTitleChange
} from '../Release/ReleaseActions'

export class TrackContainer extends React.Component {
	constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      audioFile: '',
      title: ''
    }
    this.metaDataBindFunction = this.onLoadedMetaData.bind(this)
	}

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.track.get('title') !== this.state.title) {
      this.setState({ title: nextProps.track.get('title') })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.track.get('fileSelected') && !prevProps.track.get('fileSelected')) {
      this.setState({ audioFile: URL.createObjectURL(this.props.track.get('audioFile')) }, () => {
        this.refs.hiddenAudioElement.addEventListener('loadedmetadata', this.metaDataBindFunction)
      })
    }
  }

  onLoadedMetaData() {
    console.log('audio file info, duration:', this.refs.hiddenAudioElement.duration, 'seconds, audio element:')
    this.props.updateDuration(this.refs.hiddenAudioElement.duration, this.props.index)
    this.refs.hiddenAudioElement.removeEventListener('loadedmetadata', this.metaDataBindFunction)
  }

  onTrackTitleChange(e) {
    const value = e.target.value
    this.setState({ title: value }, () => this.props.trackTitleChange(value, this.props.index))
  }

  onPlayClick (e) {
    e.preventDefault();
    this.refs.hiddenAudioElement.play();
  }


  formatDuration (durationInSeconds) {
    const min = Math.floor( durationInSeconds / 60 )
    const sec = ( Math.floor( durationInSeconds % 60 ) < 10 ? '0' : '' ) + Math.floor( durationInSeconds % 60 )
    return `${min}:${sec}`
  }

  render () {
    var audioFile = this.props.track.get('fileSelected') ? URL.createObjectURL(this.props.track.get('audioFile')) : ''
    return (
      <div className="track-container row">
        {!this.props.track.get('fileSelected')
          ? <DNDAudioContainer index={this.props.index} />
          :(<div>
            <audio ref="hiddenAudioElement" src={this.state.audioFile} />
            <TrackUploadForm

            />
            <div className='col-xs-1'>{this.props.track.get('sequence')}</div>
            <button className='col-xs-3' onClick={(e) => this.onPlayClick(e)}>Play</button>
            <div className='col-xs-6'>
              <input
                value={this.state.title}
                onChange={(e) => this.onTrackTitleChange(e)}
              />
            </div>
            <div className='col-xs-2'><span>{this.formatDuration(this.props.track.get('duration'))}</span></div>
          </div>)
        }

      </div>
    )
  }
}


function mapStateToProps (state, props) {
  return {

  }
}


TrackContainer.propTypes = {
  track: React.PropTypes.object,
  index: React.PropTypes.number
}

export default connect(
  mapStateToProps,
  { updateDuration, dropTrack, trackTitleChange }
)(TrackContainer)