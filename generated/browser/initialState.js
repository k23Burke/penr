import { Map, fromJS } from 'immutable';

const initalState = {
	auth: fromJS({
		attempted: false
	}),
	things: fromJS({})
}

export default initalState