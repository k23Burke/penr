import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { loginAttempt, getStuff, logout } from './AuthActions'

export class LoginForm extends React.Component {
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

  render () {
    return (
      <form onSubmit={(e) => {this.handleSubmit(e)}}>
        <input ref="email" placeholder="email" defaultValue="joe@example.com" />
        <br/>
        <input ref="pass" placeholder="password" /><br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
}

function mapStateToProps (state, props) {
  return {}
}

export default connect(
  mapStateToProps,
  {
    loginAttempt
  }
)(LoginForm)

