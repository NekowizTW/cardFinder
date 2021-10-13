import React from 'react'

import Store  from '../Redux/Store.js'
import Action from '../Redux/Action.js'

import Form from './CardCollec/Form.react.js'
import List from './CardCollec/List.react.js'

class CardCollec extends React.Component {
  constructor (props) {
    super(props);
    const _this = this
    const unsubscribe = Store.subscribe(() => {
      _this.setState({
        // Form.react.js
        filter: Store.getState().ListFiltter,
        filterSettings: Store.getState().SourceFilterSettings,
        // List.react.js
        list: Store.getState().ListCards,
        settings: Store.getState().ListSettings,
        team: Store.getState().TeamCards
      })
    })
    this.state = { unsubscribe: unsubscribe }
  }

  static getDerivedStateFromProps (props, state) {
    return { 
      // Form.react.js
      filter: Store.getState().ListFiltter,
      filterSettings: Store.getState().SourceFilterSettings,
      // List.react.js
      list: Store.getState().ListCards,
      settings: Store.getState().ListSettings,
      team: Store.getState().TeamCards
    }
  }

  render () {
    return <div>
      <Form query={this.props.location.query}
            filter={this.state.filter}
            settings={this.state.filterSettings} />
      <List list={this.state.list}
            settings={this.state.settings}
            team={this.state.team} />
    </div>
  }
}

export default CardCollec