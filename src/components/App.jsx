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
    this.state = {}
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

function mapStateToProps (state) {
  return {}
}

export default connect(
  mapStateToProps,
  {  }
)(App)

