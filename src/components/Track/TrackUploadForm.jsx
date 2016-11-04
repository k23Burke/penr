import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import crypto from 'crypto'

import awscreds from '../../config/AWSCredentials'

export default class TrackUploadForm extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  createS3Policy () {
    const s3Policy = {
      "expiration": "2016-12-01T12:00:00.000Z",
      "conditions": [
        ["starts-with", "$key", "track/"],
        {"bucket": "track-bucket-for-releases"},
        {"acl": "public-read"},
        ["starts-with", "$Content-Type", 'audio/mpeg'],
        {"success_action_status": "201"},
      ]
    }

    const stringPolicy = JSON.stringify(s3Policy);
    const base64Policy = Buffer(stringPolicy, "utf-8").toString("base64");

    const signature = crypto.createHmac("sha1", awscreds.secretKey)
                            .update(new Buffer(base64Policy, "utf-8")).digest("base64")

    // build the results object
    return {
      s3Policy: base64Policy,
      s3Signature: signature
    };
  }

  // onClickHandler (e) {
  //   e.preventDefault()


  // }

  render () {
    // TODO: generate policy!!!!!!!
    // TODO: generate uuid!!!!!!!
    const s3creds = this.createS3Policy()
    return (
      <div  className='container'>
        <form action='http://track-bucket-for-releases.s3.amazonaws.com/' method='post' enctype='multipart/form-data'>
          <input type='hidden' name='Content-Type' value='audio/mpeg' />
          <input type="hidden" name="AWSAccessKeyId" value={awscreds.accessKey} />
          <input type='hidden' name='acl' value='public-read' />
          <input type="hidden" name="success_action_status" value="201" />

          <input type="hidden" name="key" value="track/audio/uuid.mp3" />
          <input type="hidden" name="x-amz-meta-artist" value="" />
          <input type="hidden" name="x-amz-meta-track-name" value="" />
          <input type="hidden" name="x-amz-meta-album" value="" />
          <input type="hidden" name="x-amz-meta-track-duration" value="" />
          <input type="hidden" name="x-amz-meta-visual-key" value="track/visual/uuid.png" />
          <input type="hidden" name="x-amz-meta-owner-id" value="834" />

          <input type="hidden" name="Policy" value={s3creds.s3Policy} />
          <input type="hidden" name="X-Amz-Signature" value={s3creds.s3Signature} />

          <input type="file" name="file" ref='audio-file-input' />
          <input type="submit" value="Send Track" />
        </form>
      </div>
    )
  }
}

// export default connect(
//   mapStateToProps,
//   {
//     addBlankTrack
//   }
// )(UploadPage)

