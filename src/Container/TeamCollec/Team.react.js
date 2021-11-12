import React       from 'react'
import { Link }    from 'react-router-dom'
import Select      from 'react-select'
import { toPng }   from 'html-to-image'

import Action                 from '../../Redux/Action.js';
import { getCardById,
         getSenzaiByName,
         getEXCardById,
         getLeaderEXByValue } from '../../Helper/StoreHelper.js'
import { tw_filenameFix,
         linkGenerator,
         findByAttribute,
         uniqArray       }    from '../../Helper/RenderHelper.js'
import RenderGlobalSenzai     from './RenderGlobalSenzai.react.js'
import RenderCertainSenzai    from './RenderCertainSenzai.react.js'

function decode (code) {
  const reLead = /(L([\u4E00-\u9FFF]+)([・‧][\u4E00-\u9FFF]+)?((A\+?)|(S))\d+)/
  const reTeam = /(T\d+)(M\d+)?(S\d+)?(X)?(E\d+)?(E\d+)?(E\d+)?/gm
  const reHelp = /(H\d+)(M\d+)?(S\d+)?(E\d+)?(E\d+)?(E\d+)?/
  let team = {
    selected: [],
    leaderEX: '',
    team: [
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] }
    ],
    helper: { id: -1, szSlot: 10, mana: 0, ex: [] }
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
          if (team.team[cnt].mana < 0)   team.team[cnt].mana = 0
          if (team.team[cnt].mana > 400) team.team[cnt].mana = 400
        }
        if (mi[0] === 'S') {
          team.team[cnt].szSlot = parseInt(mi.replace('S', ''))
          if (team.team[cnt].szSlot < 0)  team.team[cnt].szSlot = 0
          if (team.team[cnt].szSlot > 10) team.team[cnt].szSlot = 10
        }
        if (mi[0] === 'X')
          team.team[cnt].exas = true
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
      if (mi[0] === 'S') {
        team.team[cnt].szSlot = parseInt(mi.replace('S', ''))
        if (team.helper.szSlot < 0)  team.helper.szSlot = 0
        if (team.helper.szSlot > 10) team.helper.szSlot = 10
      }
      if (mi[0] === 'E')
        team.helper.ex.push(mi.replace('E', ''))
    })
  }
  console.log(team);
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
         +  (teammate.mana   !== 0         ? `M${teammate.mana}`   : '')
         +  (teammate.szSlot !== 10        ? `S${teammate.szSlot}` : '')
         +  (teammate.exas                 ? `X`                   : '')
         +  (teammate.ex[0]  !== undefined ? `E${teammate.ex[0]}`  : '')
         +  (teammate.ex[1]  !== undefined ? `E${teammate.ex[1]}`  : '')
  })
  // helper
  if (team.helper.id !== -1) {
    code += `H${team.helper.id}`
         +  (team.helper.mana   !== 0         ? `M${team.helper.mana}`   : '')
         +  (team.helper.szSlot !== 10        ? `S${team.helper.szSlot}` : '')
         +  (team.helper.ex[0]  !== undefined ? `E${team.helper.ex[0]}`  : '')
         +  (team.helper.ex[1]  !== undefined ? `E${team.helper.ex[1]}`  : '')
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

    this.captureRef = React.createRef()
    this.introductionRef = React.createRef()
    this.state = { toggle: true }
    this.getMember = this.getMember.bind(this)
    this.getEx = this.getEx.bind(this)
    this.renderTeamRow = this.renderTeamRow.bind(this)
  }

  getMember (value) {
    return getCardById(value)
  }

  getLeader (value) {
    return getLeaderEXByValue(value)
  }

  getEx (value) {
    return getEXCardById(value)
  }

  generateSkillIcon (card, idx, type) {
    let res = []
    if (type === 'as' && card.asData !== undefined) {
      res = [...card.asData.type.split(/[・‧]/),
             ...card.as2Data.type.split(/[・‧]/)]
    } else if (type === 'ss' && card.ssData !== undefined) {
      res = [...card.ssData.type.replace(/【\S+】/, '').split(/[・‧]/),
             ...card.ss2Data.type.replace(/【\S+】/, '').split(/[・‧]/)]
    } else if (type === 'exas' && card.EXASData !== undefined){
      res = card.EXASData.type.split(/[・‧]/)
    }
    res = uniqArray(res)
    return res.map((o, i) => {
      let str = o
      if (str.length >= 5 &&
          str.length <= 7) str = `${o.slice(0, -2)}\n${o.slice(-2)}`;
      return <div key={`${idx}-${type}-${i}`}>{str}</div>
    })
  }

  screenShot () {
    // this.setState({ toggle: !this.state.toggle })
    const _this = this
    this.setState({ toggle: false }, () => {
      toPng(this.captureRef.current, { cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = `Team${encode(this.props.team)}.png`
          link.href = dataUrl
          link.click()
          _this.setState({ toggle: true })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } 

  renderTeamRow (teammate, idx) {
    const card  = this.getMember(teammate.id)
    const mana  = teammate.mana
    const exIds = teammate.ex
    const exs   = exIds.map(exi => this.getEx(exi))
    const md    = this.state.toggle ? '-md'      : ''
    const rwd   = this.state.toggle ? 'pure-u-1' : ''
    let calcData = { hp: 0, atk: 0, cost: 0, cdf: [0], cds: [0] }
    if (this.props.calculated && this.props.calculated[0]) {
      calcData.hp   = this.props.calculated[0][idx] + parseInt(card.max_hp)  + mana
      calcData.atk  = this.props.calculated[1][idx] + parseInt(card.max_atk) + mana
      calcData.cost = this.props.calculated[2][idx] + Math.ceil(parseInt(card.cost) * 0.8)
      // add ex cost
      if (exs.length > 0) {
        exs.forEach(exi => calcData.cost += exi.attachCost || 0)
      }
      // limit value, if there are no teammate there, set them to 0
      calcData.hp   = Math.max(1, calcData.hp) * (teammate.id !== -1 ? 1 : 0)
      calcData.atk  = Math.max(1, calcData.atk) * (teammate.id !== -1 ? 1 : 0)
      calcData.cost = Math.max(0, calcData.cost) * (teammate.id !== -1 ? 1 : 0)
      // hp atk swap check
      const swapFlag = this.props.calculated[5].certain.find(o => o.HPATKSwap !== undefined)
      if (swapFlag !== undefined && swapFlag.target[idx]) {
        [calcData.hp, calcData.atk] = [calcData.atk, calcData.hp]
      }
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
      <div className={`${rwd} pure-u${md}-3-8`}>
        <div className={'pure-g basicProfile'}>
          <div className={`${rwd} pure-u${md}-1-2`}>
            <div className={'imgFrame'}>
              {idx === 0 && <span className={'teamCardBadge'}>隊長</span>}
              {idx === 5 && <span className={'teamCardBadge'}>援助</span>}
              {teammate.exas && <div className={'exasBadge'}></div>}
              <img key={`teamForm-${idx}-img`} src={linkGenerator(card.small_filename)}/>
            </div>
            <h4>{teammate.id !== -1 ? `No. ${card.id}` : '-'}</h4>
          </div>
          <div className={`${rwd} pure-u${md}-1-2 numberData`}>
            <p>{calcData.hp}</p>
            <p>{calcData.atk}</p>
            <p>{calcData.cost}</p>
            <p className={`${this.state.toggle ? '' : 'hide'}`}>{`${calcData.cdf[0]}${calcData.cdf[1] ? `(${calcData.cdf[1]})` : ''}`}</p>
            <p className={`${this.state.toggle ? '' : 'hide'}`}>{`${calcData.cds[0]}${calcData.cds[1] ? `(${calcData.cds[1]})` : ''}`}</p>
          </div>
        </div>
      </div>
      <div className={`${rwd} pure-u${md}-1-2`}>
        <div className={`pure-g ${this.state.toggle ? '' : 'hide'}`}>
          <div className={`${rwd} pure-u${md}-1-2 teamAS`}>
            {this.generateSkillIcon(card, idx, 'as')}
          </div>
          {!teammate.exas && <div className={`${rwd} pure-u${md}-1-2 teamSS`}>
            {this.generateSkillIcon(card, idx, 'ss')}
          </div>}
          {teammate.exas && <div className={`pure-u-1 pure-u${md}-1-2 teamEXAS`}>
            {idx !== 5 && this.generateSkillIcon(card, idx, 'exas')}
          </div>}
        </div>
        <div className={'pure-g'}>
          <div key={`card-${card.id}-senzaiArr`} className={`senzaiList`}>
            {card.senzaiArr !== undefined && card.senzaiArr.map((senzaiName, i) => {
              const senzai = getSenzaiByName(senzaiName)
              const style = { filter: `grayscale(${ teammate.szSlot <= i ? '100' : '0' }%)`}
              return <img key={`card-${card.id}-senzai-${i}`} src={linkGenerator(senzai.filename)} style={style} />;
            })}
            {card.senzaiLArr !== undefined && card.senzaiLArr.length > 0 &&
              <span className={'legend'}>
                {card.senzaiLArr.map((senzaiLName, i) => {
                  const senzai = getSenzaiByName(senzaiLName)
                  return <img key={`card-${card.id}-senzaiL-${i}`} src={linkGenerator(senzai.filename)} />;
                })}
              </span>
            } 
          </div>
        </div>
        <div className={'pure-g'}>
          {exs.map((exi, i) => {
            let exName = exi.name
            const lbp = exi.name.indexOf('【'), rbp = exi.name.indexOf('】') + 1
            if (exName <= 10) exName = exi.name
            else if (lbp > 0) exName = `${exi.name.slice(0, lbp)}\n${exi.name.slice(lbp)}`
            else if (lbp === 0) exName = `${exi.name.slice(0, rbp)}\n${exi.name.slice(rbp)}`
            return <div key={`team-${idx}-ex${i + 1}`} className={`pure-u-1-${exs.length === 3 ? '3' : '2'} exSlot`}>
              <img src={linkGenerator(exi.small_filename)} />
              <span>{exName}</span>
            </div>
          })}
        </div>
      </div>
      <div className={`${rwd} pure-u${md}-1-8`}>
        <button className={`pure-button button-warning ${this.state.toggle ? '' : 'hide'}`}
                onClick={(e) => {this.props.openEditor(idx)}}>
                編輯
        </button>
        <p style={{ paddingTop: this.state.toggle ? '2em' : '0' }}>
          <b>{teammate.id !== -1 ? teammate.szSlot : '0'}潛</b>
        </p>
        <p style={{ paddingTop: '2em', color: (mana > 200 ? 'green' : 'blue') }}>
          <b>+{mana}</b>
        </p>
      </div>
    </div>)
  }

  render () {
    const team = this.props.team
    const url = encode(team)
    const lstSlash = window.location.href.lastIndexOf('team') + 4
    const prefix = window.location.href.substring(0, lstSlash)
    const leaderEX = this.getLeader(team.leaderEX)
    const md  = this.state.toggle ? '-md'      : ''
    const rwd = this.state.toggle ? 'pure-u-1' : ''
    return <div>
      <p>
        本隊伍連結: <Link to={url} target={'_blank'} style={{wordBreak: 'break-all'}}>{`${prefix}/${url}`}</Link><br />
        備註：網址列網址不會與此連結同步，請以上方連結為準。
      </p>
      <div className={'button-group'}>
        <button className={'pure-button'} onClick={() => this.screenShot()} disabled={!this.state.toggle}>
          隊伍截圖
        </button>
        <button className={'pure-button button-success'}
                onClick={() => this.introductionRef.current.scrollIntoView()}>
          使用說明
        </button>
      </div>
      <div ref={this.captureRef} className={'pure-form pure-form-stacked'}
           style={{ 'backgroundColor': this.state.toggle ? 'inherit' : '#fafafa',
                    'width': this.state.toggle ? 'auto' : '800px' }}>
          <fieldset className={'pure-group'}>
            <label>隊伍內容</label>
            <div className={''}>
              {[...team.team, team.helper].map(this.renderTeamRow)}
            </div>
          </fieldset>
          <fieldset className={'pure-group'}>
            <label>大結晶</label>
            <div className={'cardItem teamItem pure-g'}>
            <h4 className={'pure-u-1'} style={{ textAlign: 'center' }}>
              {`${leaderEX.name} ${leaderEX.rank.replace(/\d+/, '')}`}
            </h4>
            <div className={`${rwd} pure-u${md}-1-4 imgFrame`}>
              <img src={linkGenerator(leaderEX.small_filename)}/>
            </div>
            <div className={`${rwd} pure-u${md}-5-8 leaderEX`}>
              <p>{leaderEX.condition}</p>
              <p>{leaderEX.skill}</p>
            </div>
            <div className={`${rwd} pure-u${md}-1-8`}>
              <button className={`pure-button button-warning ${this.state.toggle ? '' : 'hide'}`}
                      onClick={(e) => {this.props.openLeaderEditor()}}>
                      編輯
              </button>
            </div>
          </div>
          </fieldset>
        </div>
        <h2 className={'content-subhead'}>潛能統計</h2>
        <h3>全域潛能統計</h3>
        {this.props.calculated && <RenderGlobalSenzai calculated={this.props.calculated} />}
        <h3>隊員潛能統計</h3>
        {this.props.calculated && <RenderCertainSenzai calculated={this.props.calculated} />}
        <h2 ref={this.introductionRef} className={'content-subhead'}>使用說明</h2>
        <h3>隊伍編輯</h3>
        <ul>
          <li>可編輯項目：卡片、潛能數、瑪那、EXAS切換、結晶。</li>
          <li>點選編輯可以編輯卡片，點選下方完成或是右上方的x皆可退出編輯。</li>
          <li>編輯區下方可用搜尋來檢索你的卡片，僅篩選配布卡以及自選卡片，並顯示最多100個結果。</li>
          <li>瑪那有提供預設按鈕(+0, +200, +400)，潛能預設為10潛。</li>
          <li>EXAS切換僅適用隊長與隊員，預設為特殊技能。</li>
          <li>結晶僅提供下拉搜尋，最大設置兩個，台版特製卡請先設置優先權較高的結晶上去。<br />
              在塞滿兩結晶時清空第一結晶會導致第二結晶遞補至第一結晶，若因此無法編輯可以先點完成再點編輯。</li>
        </ul>
        <h3>隊伍匯出</h3>
        <ul>
          <li>本隊伍連結適用於再編輯，編輯後會生成新的網址。</li>
          <li>隊伍截圖會遮蔽AS, EXAS技能種類、SS技能CD時間以及編輯按鈕，在預設寬度下(800px)截圖。<br />但實際截圖後大小則依據設備而定，請自行縮放至需要的大小</li>
        </ul>
        <h3>潛能統計</h3>
        <ul>
          <li>已納入面板數值潛能：HP、ATK、Cost、首回技能冷卻回合CD(F)、次回技能冷卻回合CD(S)。</li>
          <li>僅用於分析隊伍在一般型態下的基礎能力，不包含傳奇型態以及技能結晶加成。</li>
          <li>若有設定援助者，該卡片的潛能加成也會納入計算。此舉會導致數值與遊戲內隊伍編輯數值不同，但會與遊戲內戰鬥狀態相同。</li>
          <li>若在隊伍中使用天邪鬼結晶，計算結果會與運作機制一致。</li>
        </ul>
        <div className={'pure-group'}>
          <Link to={'/'} className={'pure-button button-primary'}>←返回搜尋頁面</Link>
          <button className={'pure-button button-success'}
                  onClick={() => this.captureRef.current.scrollIntoView()}>
            回到隊伍
          </button>
        </div>
    </div>
  }
}

export default Team