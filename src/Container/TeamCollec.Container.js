import React    from 'react'
import url      from 'url'
import location from 'location-href'

import CardSnap from '../Helper/CardSnap.js'
import Store    from '../Redux/Store.js'

import Team       from './TeamCollec/Team.react.js'
import EditLeader from './TeamCollec/EditLeader.react.js'
import EditModal  from './TeamCollec/EditModal.react.js'

import { getCardById,
         getSenzaiByName,
         getEXCardById   } from '../Helper/StoreHelper.js'
import { findByAttribute } from '../Helper/RenderHelper.js'
import { calcSenzai }      from '../Helper/CalculateHelper.js'

const url_parse = url.parse(location(), true)
const path = url_parse.href.replace(url_parse.hash, '')

class TeamCollec extends React.Component {
  constructor (props) {
    super(props);
    const _this = this
    const unsubscribe = Store.subscribe(() => {
      _this.setState({
        team: Store.getState().TeamCards,
        calculated: [],
        isCalculated: false
      }, (o) => { _this.calculate(Store.getState().TeamCards) })
    })
    this.state = {
      unsubscribe: unsubscribe,
      editIdx: -1,
      editLeader: false,
      isCalculated: false,
      errorSenzai: []
    }
  }

  static getDerivedStateFromProps (props, state) {
    return {
      team: Store.getState().TeamCards
    }
  }

  toggleEditLeader () {
    this.setState({ editLeader: !this.state.editLeader })
  }

  changeEditIdx (idx) {
    this.setState({ editIdx: idx })
  }

  calculate (team) {
    if (this.state.isCalculated) return
    const teamData = [...team.team, team.helper].map((teammate, idx) => {
      const card = getCardById(teammate.id)
      const szs = card.senzaiArr.map(szName => getSenzaiByName(szName)) || []
      const exs = teammate.ex.map(exi => {
        const ex = getEXCardById(exi)
        return getSenzaiByName(ex.senzai_1)
      }) || []
      return Object.assign({}, card, {sz: szs}, {ex: exs})
    })
    // console.log(teamData)
    const { calculated, errorSenzai } = calcSenzai(teamData)
    this.setState({
      calculated: calculated,
      isCalculated: true,
      errorSenzai: errorSenzai
    })
  }

  render () {
    const code = this.props.match.params.code
    return <div>
      <Team code={code}
            team={this.state.team}
            calculated={this.state.calculated}
            errorSenzai={this.state.errorSenzai}
            openEditor={(idx) => this.changeEditIdx(idx)}
            openLeaderEditor={() => this.toggleEditLeader()} />
      <EditLeader team={this.state.team}
                  editLeader={this.state.editLeader}
                  closeEditor={() => this.toggleEditLeader()} />
      <EditModal team={this.state.team}
                 editIdx={this.state.editIdx}
                 closeEditor={() => this.changeEditIdx(-1)} />
    </div>
  }
}

export default TeamCollec