import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { userLogin, getStuff, logout } from '../components/Auth/AuthActions'
import LoginForm from '../components/Auth/LoginForm'
import SignupForm from '../components/Auth/SignupForm'

export class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
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
        <div className='row'>
          <h1>Welcome to the PENR Generator</h1>
          <h3>Goodluck app-building</h3>
          <LoginForm />
          <SignupForm />
        </div>
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
    userLogin, getStuff, logout
  }
)(HomePage)

