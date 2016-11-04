import { Map, fromJS } from 'immutable';

const initalState = {
	release: fromJS({
		artist: '',
		album: '',
		tracks: [],
		imageFile: new Image(),
		imageSelected: false
		// TODO: label: ''
	})
}

export default initalState