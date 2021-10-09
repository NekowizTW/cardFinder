import React from 'react'

import Store  from '../Redux/Store.js'
import Action from '../Redux/Action.js'

class TeamCollec extends React.Component {
  constructor (props) {
    super(props);
    const unsubscribe = Store.subscribe(() => {})
    this.state = { cnt: 0, unsubscribe: unsubscribe }
  }

  static getDerivedStateFromProps (props, state) {
    return {
      sourceData: Store.getState().SourceCards,
      sourceSenzai: Store.getState().SourceSenzai,
      team: Store.getState().TeamCards
    }
  }

  render () {
    console.log(this.state)
    return <div>
      <h2>TeamCollec</h2>
      <button onClick={() => {this.setState({ cnt: this.state.cnt + 1 })}}>{this.state.cnt}</button>
    </div>
  }
}

export default TeamCollec