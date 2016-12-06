import { combineReducers } from 'redux'
import AuthReducer from '../components/Auth/AuthReducer'

export default combineReducers({
	auth: AuthReducer
})