import React from 'react'

import Store  from '../../Redux/Store'

import EXCards  from './EXCards'
import LeaderEX from './LeaderEX'

class EXCollec extends React.Component {
  constructor (props) {
    super(props);
    const _this = this
    const unsubscribe = Store.subscribe(() => {
      _this.setState({
        EXCards: Store.getState().SourceEXCards,
        LeaderEXCards: Store.getState().SourceLeaderEXCards
      })
    })
    this.state = { unsubscribe: unsubscribe, isLeaderEXPage: false }
  }

  static getDerivedStateFromProps (props, state) {
    return {
      EXCards: Store.getState().SourceEXCards,
      LeaderEXCards: Store.getState().SourceLeaderEXCards
    }
  }

  changeSubPage () {
    this.setState({ isLeaderEXPage: !this.state.isLeaderEXPage })
  }

  render () {
    return <div>
      {!this.state.isLeaderEXPage && <EXCards EXCards={this.state.EXCards} changeSubPage={this.changeSubPage.bind(this)} />}
      {this.state.isLeaderEXPage && <LeaderEX leaderEXs={this.state.LeaderEXCards} changeSubPage={this.changeSubPage.bind(this)} />}
    </div>
  }
}

export default EXCollec