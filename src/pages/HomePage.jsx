import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { EmailSignUpForm } from 'redux-auth/default-theme'
import { loginAttempt, getStuff, logout } from '../components/Auth/AuthActions'

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

    // auth.login(email, pass, (loggedIn) => {
    //   if (!loggedIn) return this.setState({ error: true })

    //   const { location } = this.props

    //   if (location.state && location.state.nextPathname) {
    //     this.props.router.replace(location.state.nextPathname)
    //   } else {
    //     this.props.router.replace('/')
    //   }
    // })
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
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
          <br/>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
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

