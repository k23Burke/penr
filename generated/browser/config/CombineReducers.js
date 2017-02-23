import { combineReducers } from 'redux'
import AuthReducer from '../components/Auth/AuthReducer'
import ThingReducer from '../components/Things/ThingReducer'

export default combineReducers({
	auth: AuthReducer,
	things: ThingReducer
})