import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {
  updateArtist,
  updateAlbum
} from './ReleaseActions'


export class ReleaseInformation extends React.Component {
	constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      artist: '',
      album: ''
    }
	}

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.release.get('artist') !== this.state.artist) {
      this.setState({ artist: nextProps.release.get('artist') })
    }
    if (nextProps.release.get('album') !== this.state.album) {
      this.setState({ album: nextProps.release.get('album') })
    }
  }

  onChangeValue(e, type) {
    const value = e.target.value
    switch(type){
      case 'artist' :
        return this.setState({ artist: value }, () => this.props.updateArtist(value))

      case 'album' :
        return this.setState({ album: value }, () => this.props.updateAlbum(value))
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-xs-4'>
          <img className='album-cover' src={this.props.release.get('imageFile')}/>
        </div>
        <div className='col-xs-8'>
  				<input placeholder='Artist Name' value={this.state.artist} onChange={(e) => this.onChangeValue(e, 'artist')} />
  				<input placeholder='Album Name' value={this.state.album} onChange={(e) => this.onChangeValue(e, 'album')}/>
        </div>
      </div>
    )
  }

}

ReleaseInformation.propTypes = {
	release: React.PropTypes.object
}


function mapStateToProps (state, props) {
  return { }
}

export default connect(
  mapStateToProps,
  {
    updateArtist,
    updateAlbum
  }
)(ReleaseInformation)