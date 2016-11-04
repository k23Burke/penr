import {
  DROP_TRACK,
  UPDATE_DURATION,
  ADD_BLANK_TRACK,
  TRACK_TITLE_CHANGE,
  UPDATE_ARTIST_NAME,
  UPDATE_ALBUM_NAME
} from '../../constants/ActionTypes'
// import 'uuid' from uuid

export function addBlankTrack () {
	return {
		type: ADD_BLANK_TRACK
	}
}

export function dropTrack (audioFile, trackInfo, trackIndex) {
	return {
		type: DROP_TRACK,
		audioFile,
		trackInfo,
		trackIndex
	}
}

export function updateDuration (duration, trackIndex) {
	return {
		type: UPDATE_DURATION,
		duration,
		trackIndex
	}
}

export function trackTitleChange (name, trackIndex) {
	return {
		type: TRACK_TITLE_CHANGE,
		name,
		trackIndex
	}
}

export function updateArtist (name) {
	return {
		type: UPDATE_ARTIST_NAME,
		name
	}
}

export function updateAlbum (name) {
	return {
		type: UPDATE_ALBUM_NAME,
		name
	}
}

export function uploadTrackToAWS () {
	// const uuid = uuid.v4()
	// const formData = new formData()
	// success_action_status
	// policy
 //    'max_file_size' => 20,
 //    'expires' => '+10 minutes',
 //    'content_type' => 'audio/mpeg',
 //    'default_filename' => 'track/audio/' . uuid . '.mp3',
 //    'additional_inputs' => [
 //        'acl' => 'private',
 //        'x-amz-meta-artist' => '',
 //        'x-amz-meta-track-name' => '',
 //        'x-amz-meta-album' => '',
 //        'x-amz-meta-track-duration' => '',
 //        'x-amz-meta-visual-key' => 'track/visual/' . uuid . '.png',
 //        'x-amz-meta-owner-id' => $current_user->ID
 //    ],
}

export function uploadImageToAWS () {

        // 'acl' => 'public-read',
        // 'max_file_size' => 2,
        // 'expires' => '+10 minutes',
        // 'content_type' => 'image/jpeg',
        // 'default_filename' => 'track/visual/' . $awsUuid . '.png',
        // 'additional_inputs' => [
        //     'x-amz-meta-owner-id' => $current_user->ID
        // ],
}