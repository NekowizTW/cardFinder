import React from 'react'

import Store  from '../Redux/Store.js'
import Action from '../Redux/Action.js'

class CardCollec extends React.Component {
  constructor (props) {
    super(props);
    const unsubscribe = Store.subscribe(() => {})
    this.state = { cnt: 0, unsubscribe: unsubscribe }
  }

  static getDerivedStateFromProps (props, state) {
    return { 
      //Form.react.js
      filter: Store.getState().ListFiltter,
      filterSettings: Store.getState().SourceFilterSettings,
      //List.react.js
      list: Store.getState().ListCards,
      settings: Store.getState().ListSettings
    }
  }

  render () {
    console.log(this.state)
    return <div>
      <h2>CardCollec</h2>
      <button onClick={() => {this.setState({ cnt: this.state.cnt + 1 })}}>{this.state.cnt}</button>
    </div>
  }
}

export default CardCollec