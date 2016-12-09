import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'
import { hashHistory } from 'react-router'

import '../style/app.scss'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.auth.get('success') && this.props.auth.get('success')) {
      hashHistory.push('/protect')
    }
  }

  componentWillMount () {
    this.setState({initialized: true})
  }

  render () {
    return (
      <div className='main-container'>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  {  }
)(App)

