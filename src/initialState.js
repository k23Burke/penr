import { Map, fromJS } from 'immutable';

const initalState = {
	release: fromJS({
		artist: '',
		album: '',
		tracks: [],
		imageFile: new Image(),
		imageSelected: false
		// TODO: label: ''
	}),
	auth: fromJS({
		attempted: false
	})
}

export default initalState