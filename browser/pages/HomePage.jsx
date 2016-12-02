import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { EmailSignUpForm } from 'redux-auth/default-theme'
import { loginAttempt, getStuff, logout } from '../components/Auth/AuthActions'
import LoginForm from '../components/Auth/LoginForm'

import {
  addBlankTrack,

} from '../components/Release/ReleaseActions'

export class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = { error: false }
  }

  handleSubmit (e) {
    e.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    this.props.loginAttempt(email, pass)
  }

  handleStuff (e) {
    e.preventDefault()

    this.props.getStuff(this.props.user.get('token'))
  }

  handleLogout (e) {
    e.preventDefault()

    this.props.logout()
  }

  render () {
    return (
      <div  className='container'>
        <h1>THIS IS YOUR HOME</h1>
        <LoginForm />
        <button onClick={(e) => this.handleStuff(e)}>GET USER</button>
        <button onClick={(e) => this.handleLogout(e)}>Logout</button>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    user: state.auth
  }
}

export default connect(
  mapStateToProps,
  {
    loginAttempt, getStuff, logout
  }
)(HomePage)

