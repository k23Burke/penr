import { combineReducers } from 'redux'
// import TracksReducer from '../components/Track/TracksReducer'
import ReleaseReducer from '../components/Release/ReleaseReducer'

export default combineReducers({
	// tracks: TracksReducer,
	release: ReleaseReducer
})