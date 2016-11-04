import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import TrackContainer from '../components/Track/TrackContainer'
import ReleaseInformation from '../components/Release/ReleaseInformation'

import {
  addBlankTrack,

} from '../components/Release/ReleaseActions'

export class UploadPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount () {
    document.title = 'Upload Page'
    this.props.addBlankTrack()
  }

  render () {
    return (
      <div  className='container'>
        <div className="header-container">
          <ReleaseInformation
            release={this.props.release}
          />
        </div>
        <div className="tracklist-container">
          {this.props.release.get('tracks').map((t,i) =>
            <TrackContainer key={i} track={t} index={i} />
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    release: state.release
  }
}

export default connect(
  mapStateToProps,
  {
    addBlankTrack
  }
)(UploadPage)

