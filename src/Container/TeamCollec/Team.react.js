import React       from 'react'
import { Link }    from 'react-router-dom'
import Select from 'react-select'

import Action                    from '../../Redux/Action.js';
import { getCardById,
         getSenzaiByName,
         getEXCardById,
         getLeaderEXByNameRank } from '../../Helper/StoreHelper.js'
import { tw_filenameFix,
         linkGenerator,
         findByAttribute,
         uniqArray       }       from '../../Helper/RenderHelper.js'
import { ASTAG, EXASTAG }        from '../../Helper/CSSTags.js'

function decode (code) {
  const reLead = /(L([\u4E00-\u9FFF]+)((A\+?)|(S))\d+)/
  const reTeam = /(T\d+)(M\d+)?(E\d+)?(E\d+)?/gm
  const reHelp = /(H\d+)(M\d+)?(E\d+)?(E\d+)?/
  let team = {
    selected: [],
    leaderEX: '',
    team: [
      { id: -1, mana: 0, ex: [] },
      { id: -1, mana: 0, ex: [] },
      { id: -1, mana: 0, ex: [] },
      { id: -1, mana: 0, ex: [] },
      { id: -1, mana: 0, ex: [] }
    ],
    helper: { id: -1, mana: 0, ex: [] }
  }
  // grab leaderEX
  if (reLead.test(code)) {
    reLead.lastIndex = 0 // reset for first match
    const m = reLead.exec(code)
    m.forEach(mi => {
      if (mi === undefined)
        return
      if (mi[0] === 'L')
        team.leaderEX = mi.replace('L', '')
    })
  }
  // grab team
  if (reTeam.test(code)) {
    reTeam.lastIndex = 0 // reset for first match
    let cnt = 0, m
    while ((m = reTeam.exec(code)) !== null) {
      if (cnt > 4) break
      m.forEach(mi => {
        if (mi === undefined)
          return
        if (mi[0] === 'T')
          team.team[cnt].id = mi.replace('T', '')
        if (mi[0] === 'M') {
          team.team[cnt].mana = parseInt(mi.replace('M', ''))
          if (team.team[cnt].mana < 0) team.team[cnt].mana = 0
        }
        if (mi[0] === 'E')
          team.team[cnt].ex.push(mi.replace('E', ''))
      })
      cnt += 1
    }
  }
  // grab helper
  if (reHelp.test(code)) {
    reHelp.lastIndex = 0 // reset for first match
    const m = reHelp.exec(code)
    m.forEach(mi => {
      if (mi === undefined)
        return
      if (mi[0] === 'H')
        team.helper.id = mi.replace('H', '')
      if (mi[0] === 'M') {
        team.helper.mana = parseInt(mi.replace('M', ''))
        if (team.helper.mana < 0) team.helper.mana = 0
      }
      if (mi[0] === 'E')
        team.helper.ex.push(mi.replace('E', ''))
    })
  }
  return team
}

function encode (team) {
  let code = ''
  // leader
  if (team.leaderEX.length > 0) {
    code += `L${team.leaderEX}`
  }
  // team
  team.team.forEach(teammate => {
    if (teammate.id === -1) return
    code += `T${teammate.id}`
         +  (teammate.mana  !== 0         ? `M${teammate.mana}`  : '')
         +  (teammate.ex[0] !== undefined ? `E${teammate.ex[0]}` : '')
         +  (teammate.ex[1] !== undefined ? `E${teammate.ex[1]}` : '')
  })
  // helper
  if (team.helper.id !== -1) {
    code += `H${team.helper.id}`
         +  (team.helper.mana  !== 0         ? `M${team.helper.mana}`  : '')
         +  (team.helper.ex[0] !== undefined ? `E${team.helper.ex[0]}` : '')
         +  (team.helper.ex[1] !== undefined ? `E${team.helper.ex[1]}` : '')
  }
  return code
}

class Team extends React.Component {
  constructor (props) {
    super(props)

    if (props.code && props.code.length !== 0) {
      const team = decode(props.code)
      Action.updateTeam(team)
    }

    this.state = { toggle: Array(6).fill(false) }
    this.getMember = this.getMember.bind(this)
    this.getEx = this.getEx.bind(this)
    this.renderTeamRow = this.renderTeamRow.bind(this)
  }

  getMember (value) {
    return getCardById(value)
  }

  getLeader (value) {
    const rank = value.replace(/[\u4E00-\u9FFF]+/, '')
    const name = value.replace(rank, '')
    return getLeaderEXByNameRank(name, rank)
  }

  getEx (value) {
    return getEXCardById(value)
  }

  generateASIcon (card, idx, type) {
    let res = []
    if (type === 'as' && card.asData !== undefined) {
      const as  = card.asData.type.split('・').map(o => ASTAG[o])
      const as2 = card.as2Data.type.split('・').map(o => ASTAG[o])
      res = [...as, ...as2]
    } else if (type === 'exas' && card.EXASData !== undefined){
      res = card.EXASData.type.split('・').map(o => EXASTAG[o])
    }
    res = uniqArray(res).filter(x => x !== undefined)
    return res.map((o, i) => <div key={`${idx}-${type}-${i}`} className={o} />)
  }

  toggleDetail (idx) {
    let toggle = this.state.toggle
    toggle[idx] = !toggle[idx]
    this.setState({ toggle: toggle })
  } 

  renderTeamRow (teammate, idx) {
    const card = this.getMember(teammate.id)
    const mana = teammate.mana
    const exIds = teammate.ex
    const exs   = exIds.map(exi => this.getEx(exi))
    let calcData = { hp: 0, atk: 0, cost: 0, cdf: [0], cds: [0] }
    if (this.props.calculated && this.props.calculated[0]) {
      calcData.hp   = this.props.calculated[0][idx] + parseInt(card.max_hp)  + mana
      calcData.atk  = this.props.calculated[1][idx] + parseInt(card.max_atk) + mana
      calcData.cost = this.props.calculated[2][idx] + parseInt(card.cost)
      // limit value
      calcData.hp   = Math.max(1, calcData.hp)
      calcData.atk  = Math.max(1, calcData.atk)
      calcData.cost = Math.max(0, calcData.cost)
      if (card.ssData.turn) {
        calcData.cdf[0] = this.props.calculated[3][idx] + parseInt(card.ssData.turn)
        calcData.cds[0] = this.props.calculated[4][idx] + parseInt(card.ssData.turn)
        calcData.cdf[0] = Math.max(0, calcData.cdf[0])
        calcData.cds[0] = Math.max(0, calcData.cds[0])
      }
      if (card.ss2Data.turn) {
        calcData.cdf[1] = this.props.calculated[3][idx] + parseInt(card.ss2Data.turn)
        calcData.cds[1] = this.props.calculated[4][idx] + parseInt(card.ss2Data.turn)
        calcData.cdf[1] = Math.max(0, calcData.cdf[1])
        calcData.cds[1] = Math.max(0, calcData.cds[1])
      }
    }
    return(<div key={`team-${idx}-base`} className={'cardItem teamItem pure-g'}>
      <div className={'pure-u-1 pure-u-md-2-5'}>
        <div className={'pure-g'}>
          <div className={'pure-u-1 pure-u-md-1-2'}>
            <div className={'imgFrame'}>
              {idx === 0 &&
                <span className={'teamCardBadge'}>隊長</span>
              }
              {idx === 5 &&
                <span className={'teamCardBadge'}>援助</span>
              }
              <img key={`teamForm-${idx}-img`} src={linkGenerator(card.small_filename)}/>
            </div>
            <p style={{ paddingTop: '2em', color: (mana > 200 ? 'green' : '') }}><b>+{mana}</b></p>
          </div>
          <div className={'pure-u-1 pure-u-md-1-2 numberData'}>
            <p>{calcData.hp}</p>
            <p>{calcData.atk}</p>
            <p>{calcData.cost}</p>
            <p>{`${calcData.cdf[0]}${calcData.cdf[1] ? `(${calcData.cdf[1]})` : ''}`}</p>
            <p>{`${calcData.cds[0]}${calcData.cds[1] ? `(${calcData.cds[1]})` : ''}`}</p>
          </div>
        </div>
      </div>
      <div className={'pure-u-1 pure-u-md-2-5'}>
        <div className={'pure-g'}>
          <div className={'teamAS'}>
            {this.generateASIcon(card, idx, 'as')}
            {this.generateASIcon(card, idx, 'exas')}
          </div>
        </div>
        <div className={'pure-g'}>
          {exs.map((exi, i) => {
            return <div key={`team-${idx}-ex${i + 1}`} className={'pure-u-1 pure-u-md-1-2 exSlot'}>
              <img src={linkGenerator(exi.small_filename)} />
              <span>{exi.name}</span>
            </div>
          })}
        </div>
      </div>
      <div className={'pure-u-1 pure-u-md-1-5 btns'}>
        <button className={`pure-button button-warning`}
                onClick={(e) => {this.props.openEditor(idx)}}>
                編輯
        </button>
        <button className={`pure-button`}
                onClick={(e) => {this.toggleDetail(idx)}}>
                {this.state.toggle[idx] ? '收回' : '展開'}
        </button>
      </div>
      <div className={`pure-u-1 teamCardDetail ${this.state.toggle[idx] ? 'toggle' : ''}`}>
        <div className={'pure-g'}>
          <div className={'pure-u-1 pure-u-md-1-2'} style={{ textAlign: 'left' }}>
            <div className={'skillType'}>
              <p>{card.ssData.type}</p>
              <p>{card.ss2Data.type}</p>
              {card.EXASData && <p>
                {card.EXASData.condition}
              </p>}
            </div>
          </div>
          <div className={'pure-u-1 pure-u-md-1-2'}>
            <h4>額外能力</h4>
          </div>
        </div>
      </div>
    </div>)
  }

  render () {
    const team = this.props.team
    const url = encode(team)
    const lstSlash = window.location.href.lastIndexOf('team') + 4
    const prefix = window.location.href.substring(0, lstSlash)
    const leaderEX = this.getLeader(team.leaderEX)
    return <div>
      <p>
        本隊伍連結: <Link to={url} target={'_blank'}>{`${prefix}/${url}`}</Link><br />
        備註：網址列網址不會與此連結同步，請以上方連結為準。
      </p>
      <div className={'pure-form pure-form-stacked'}>
          <fieldset className={'pure-group'}>
            <label>隊伍內容</label>
            <div className={''}>
              {[...team.team, team.helper].map(this.renderTeamRow)}
            </div>
          </fieldset>
          <fieldset className={'pure-group'}>
            <label>大結晶</label>
            <div className={'cardItem teamItem pure-g'}>
            <div className={'pure-u-1 pure-u-md-1-5'}>
              <div className={'pure-g'}>
                <div className={'pure-u-1'}>
                  <div className={'imgFrame'}>
                    <img src={linkGenerator(leaderEX.small_filename)}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={'pure-u-1 pure-u-md-3-5'}>
              <h4>{`${leaderEX.name} ${leaderEX.rank.replace(/\d+/, '')}`}</h4>
              <div className={'leaderEX'}>
                <p>{leaderEX.condition}</p>
                <p>{leaderEX.skill}</p>
              </div>
            </div>
            <div className={'pure-u-1 pure-u-md-1-5 btns'}>
              <button className={`pure-button button-warning`}
                      onClick={(e) => {this.props.openLeaderEditor()}}>
                      編輯
              </button>
            </div>
          </div>
          </fieldset>
          <h2 className={'content-subhead'}>使用說明</h2>
          <h3>在隊伍內容中</h3>
          <ul>
            <li>點選編輯可以編輯卡片，請使用下方搜尋結果選擇你的卡片</li>
          </ul>
          <fieldset className={'pure-group'}>
            <Link to={'/'} className={'pure-button button-primary'}>←返回搜尋頁面</Link>
          </fieldset>
        </div>
    </div>
  }
}

export default Team