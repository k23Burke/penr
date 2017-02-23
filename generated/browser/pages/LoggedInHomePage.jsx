import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getUserThings } from '../components/Things/ThingActions'
import NewThingForm from '../components/Things/NewThingForm'
import ThingItem from '../components/Things/ThingItem'

export class LoggedInHomePage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    this.props.getUserThings()
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <h1>You are logged in</h1>
          <NewThingForm />
        </div>
        {(this.props.things && this.props.things.size > 0)
          ?(
            <div className='row'>
              {this.props.things.map( thing =>
                <ThingItem key={thing.get('id')} name={thing.get('name')} />
              )}
            </div>
          ): <h1>Loading</h1>
        }
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    things: state.things.get('things')
  }
}

export default connect(
  mapStateToProps,
  {
    getUserThings
  }
)(LoggedInHomePage)


