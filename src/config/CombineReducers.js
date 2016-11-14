import { combineReducers } from 'redux'
// import TracksReducer from '../components/Track/TracksReducer'
import ReleaseReducer from '../components/Release/ReleaseReducer'
import AuthReducer from '../components/Auth/AuthReducer'

export default combineReducers({
	// tracks: TracksReducer,
	release: ReleaseReducer,
	auth: AuthReducer
})