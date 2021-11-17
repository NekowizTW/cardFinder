import React       from 'react'
import TextFilter  from 'react-text-filter'
import Select      from 'react-select'
import Modal       from 'react-modal'
import InputNumber from 'rc-input-number'

import Action             from '../../Redux/Action.js'
import Store              from '../../Redux/Store.js'
import { getCardById,
         getSenzaiByName,
         getEXCardById  } from '../../Helper/StoreHelper.js'
import { tw_filenameFix,
         linkGenerator,
         filterByObject } from '../../Helper/RenderHelper.js'

const customStyles = {
  content: {
    width: '80%',
    height: '100%',
    maxWidth: '600px',
    maxHeight: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {zIndex: 2000}
}

class EditModal extends React.Component {
  constructor (props) {
    super(props)

    const _this = this
    const unsubscribe = Store.subscribe(() => {
      const cardOptions = [{ label: '無', value: '-1', small_filename: '0000.png'},
      ...Store.getState().SourceCards.map(card => {
        return {
          label: `${card.name} [${card.evo_now}/${card.evo_max}]`,
          value: card.id,
          small_filename: card.small_filename,
          isHaifu: card.obtainType !== undefined && card.obtainType.type === 'haifu'
        }
      })]
      const exOptions = [{ label: '無結晶', value: '', small_filename: '0000.png'},
        ...Store.getState().SourceEXCards.map(card => {
          return {
            label: card.name,
            value: card.id,
            small_filename: card.small_filename
          }
        }).filter(option => option.label.length > 0)
      ]
      _this.setState({
        cardOptions: cardOptions,
        exOptions: exOptions
      })
    })

    this.state = {
      unsubscribe: unsubscribe,
      cardOptions: [{ label: '無', value: '-1', small_filename: '0000.png'}],
      cardOptionsFiltered: [],
      searchString: '',
      showHaifuOnly: false,
      showSelectedOnly: false,
      exOptions: [{ label: '無結晶', value: '', small_filename: '0000.png'}],
      visible: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    const visible = props.editIdx !== -1
    const cardOptions = [{ label: '無', value: '-1', small_filename: '0000.png'},
      ...Store.getState().SourceCards.map(card => {
        return {
          label: `${card.name}`,
          value: card.id,
          evo: `[${card.evo_now}/${card.evo_max}]`,
          small_filename: card.small_filename,
          isHaifu: card.obtainType !== undefined && card.obtainType.type === 'haifu'
        }
      })
    ]
    const exOptions = [{ label: '無結晶', value: '', small_filename: '0000.png'},
      ...Store.getState().SourceEXCards.map(card => {
        return {
          label: card.name,
          value: card.id,
          small_filename: card.small_filename
        }
      })
    ]
    return {
      visible: visible,
      cardOptions: cardOptions,
      exOptions: exOptions
    }
  }

  filterHaifu (candidate, inputVal) {
    if (this.state.showHaifuOnly)
      return candidate.isHaifu
    else
      return true
  }

  setMember (team, option, idx) {
    const id = option.value
    if (idx === -1) return
    if (idx === 5) team.helper.id = id
    else team.team[idx].id = id
    Action.updateTeam(team)
  }

  getMember (team, idx) {
    const defaultValue = { label: '無', value: '-1', small_filename: '0000.png'}
    if (idx === -1) return defaultValue
    const target = idx === 5 ? team.helper : team.team[idx]
    if (target === undefined) return defaultValue
    return getCardById(target.id)
  }

  setMana (team, value, idx) {
    value = Math.max(value, 0)
    if (idx === -1) return
    if (idx === 5) team.helper.mana = value
    else team.team[idx].mana = value
    Action.updateTeam(team)
  }

  getMana (team, idx) {
    const defaultValue = 0
    if (idx === -1) return defaultValue
    const target = idx === 5 ? team.helper : team.team[idx]
    if (target === undefined) return defaultValue
    return target.mana
  }

  setSzSlot (team, value, idx) {
    value = Math.max(value, 0)
    if (idx === -1) return
    if (idx === 5) team.helper.szSlot = value
    else team.team[idx].szSlot = value
    Action.updateTeam(team)
  }

  getSzSlot (team, idx) {
    const defaultValue = 10
    if (idx === -1) return defaultValue
    const target = idx === 5 ? team.helper : team.team[idx]
    if (target === undefined) return defaultValue
    return target.szSlot
  }

  setExas (team, value, idx) {
    value = Math.max(value, 0)
    if (idx === -1) return
    if (idx === 5) team.helper.exas = value
    else team.team[idx].exas = value
    Action.updateTeam(team)
  }

  getExas (team, idx) {
    const defaultValue = false
    if (idx === -1) return defaultValue
    const target = idx === 5 ? team.helper : team.team[idx]
    if (target === undefined) return defaultValue
    return target.exas
  }

  setEx (team, option, idx, pos) {
    const id = option.value
    if (idx === -1) return
    let target = idx === 5 ? team.helper : team.team[idx]
    if (idx === 5) {
      team.helper.ex[pos] = id
      team.helper.ex = team.helper.ex.filter(String)
    } else {
      team.team[idx].ex[pos] = id
      team.team[idx].ex = team.team[idx].ex.filter(String)
    }
    Action.updateTeam(team)
  }

  getEx (team, idx, pos) {
    const defaultValue = { label: '無結晶', value: '', small_filename: '0000.png'}
    if (idx === -1) return defaultValue
    let target = idx === 5 ? team.helper : team.team[idx]
    if (target === undefined) return defaultValue
    if (pos >= target.ex.length) return defaultValue

    return this.state.exOptions.find(option => option.value === target.ex[pos])
  }

  filterChange (str, type = 'text') {
    const searchString = (type === 'text' ? str : this.state.searchString).trim()
    const isHaifu = type === 'checkbox' ? str : this.state.showHaifuOnly
    const isSelected = type === 'selected' ? str : this.state.showSelectedOnly
    this.setState({
      searchString: searchString,
      showHaifuOnly: isHaifu,
      showSelectedOnly: isSelected
    }, () => {
      let cardOptionsFiltered = this.state.cardOptions
      if (isSelected)
        cardOptionsFiltered = cardOptionsFiltered.filter(option => this.props.team.selected.indexOf(option.value) >= 0)
      if (isHaifu)
        cardOptionsFiltered = filterByObject(cardOptionsFiltered, { isHaifu: isHaifu })
      cardOptionsFiltered = cardOptionsFiltered.filter(option => option.label.indexOf(searchString) >= 0)
      cardOptionsFiltered = cardOptionsFiltered.reverse().slice(0, 100)
      this.setState({
        cardOptionsFiltered: cardOptionsFiltered
      })
    })
  }

  render () {
    if (this.props.editIdx === -1) return <div></div>
    const team = this.props.team
    const editIdx = this.props.editIdx
    const card = this.getMember(team, editIdx)
    const ex1 = this.getEx(team, editIdx, 0)
    const ex2 = this.getEx(team, editIdx, 1)
    const ex3 = this.getEx(team, editIdx, 2)
    return <div>
      <Modal contentLabel={'編輯卡片'}
             style={customStyles}
             isOpen={this.state.visible}
             onAfterOpen={() => {}}
             onRequestClose={() => this.props.closeEditor()}
             ariaHideApp={false}>
        <a onClick={() => this.props.closeEditor()}
           style={{'position': 'absolute', 'right': '10px', top: '10px', 'width': '10px', 'height': '10px'}}>
          <i className={'fa-solid fa-xmark'} style={{'cursor': 'pointer'}}></i>
        </a>
        <div className={'pure-g cardItem'}>
          <h2 className={'pure-u-1'}>正在編輯{editIdx === 5 ? '援助者' : `隊員${this.props.editIdx + 1}`}</h2>
          <div className={'pure-u-1 pure-u-md-1-3 imgFrame center-middle'}>
            <img key={`EditModal-${this.props.editIdx}-img`}
                 src={linkGenerator(card.small_filename)} />
          </div>
          <div className={'pure-u-1 pure-u-md-2-3 center-middle'}>
            <h3>{card.name}</h3>
          </div>
          <div className={'pure-u-1 pure-u-md-1-3'}>
            <legend>潛能</legend>
            <InputNumber min={0} max={10} value={this.getSzSlot(team, editIdx)}
                         onChange={(val) => this.setSzSlot(team, val, editIdx)}
                         keyboard stringMode
                         style={{ width: '100%'}} />
          </div>
          <div className={'pure-u-1 pure-u-md-1-3'}>
            <legend>Mana</legend>
            <InputNumber min={0} max={400} value={this.getMana(team, editIdx)}
                         onChange={(val) => this.setMana(team, val, editIdx)}
                         keyboard stringMode
                         style={{ width: '100%', 'height': '30px'}} />
            <div className={'pure-group'}>
              <button className={'pure-button button-xsmall'}
                      onClick={(val) => this.setMana(team, 0, editIdx)}>+0</button>
              <button className={'pure-button button-xsmall'}
                      onClick={(val) => this.setMana(team, 200, editIdx)}>+200</button>
              <button className={'pure-button button-xsmall'}
                      onClick={(val) => this.setMana(team, 400, editIdx)}>+400</button>
            </div>
          </div>
          {editIdx !== 5 && <div className={'pure-u-1 pure-u-md-1-3 toggleModify'}>
            <legend>&nbsp;</legend>
            <input type={'checkbox'} id={'toggleEXAS'} checked={this.getExas(team, editIdx)}
                   onChange={(e) => this.setExas(team, e.target.checked, editIdx)} />
            <label htmlFor={'toggleEXAS'}>
              <span></span>
            </label>
          </div>}
          <div className={'pure-u-1 pure-u-md-1-3'}>
            <Select className={'pure-input-1'}
                    value={ex1}
                    onChange={(obj) => {this.setEx(team, obj, editIdx, 0)}}
                    options={this.state.exOptions} />
          </div>
          <div className={'pure-u-1 pure-u-md-1-3'}>
            <Select className={'pure-input-1'}
                    value={ex2}
                    onChange={(obj) => {this.setEx(team, obj, editIdx, 1)}}
                    options={this.state.exOptions} />
          </div>
          <div className={'pure-u-1 pure-u-md-1-3'}>
            <button className={`pure-button ${ex3.value.length === 0 ? '' : 'hide'}`}
                    onClick={(e) => {
                      e.target.classList.add('hide')
                      e.target.nextElementSibling.classList.remove('hide')
                    }}>啟用第三結晶</button>
            <Select className={`pure-input-1 ${ex3.value.length === 0 ? 'hide' : ''}`}
                    value={ex3}
                    onChange={(obj) => {this.setEx(team, obj, editIdx, 2)}}
                    options={this.state.exOptions} />
          </div>
          <hr className={'pure-u-1'} />
          <div className={'pure-u-1'}>
            <div className={'pure-form pure-g'}>
              <TextFilter
                filter={this.state.searchString} onFilter={(e) => this.filterChange(e.target.value)}
                debounceTimeout={100} minLength={1}
                placeholder={'請輸入卡片名字'} className={'pure-u-1'}
              />
              <label htmlFor={'filter-onlyHaifu'} className={'pure-u-1 pure-u-md-1-2'}>
                <input id={'filter-onlyHaifu'} type="checkbox"
                       value={this.props.onlyHaifu} onChange={(e) => this.filterChange(e.target.checked, 'checkbox')} />
                <span style={{'paddingLeft': '0.5em'}}>限定配布卡</span>
              </label>
              <label htmlFor={'filter-showSelectedOnly'} className={'pure-u-1 pure-u-md-1-2'}>
                <input id={'filter-showSelectedOnly'} type="checkbox"
                       value={this.props.showSelectedOnly} onChange={(e) => this.filterChange(e.target.checked, 'selected')} />
                <span style={{'paddingLeft': '0.5em'}}>使用搜尋器選擇的卡</span>
              </label>
              <h4 className={'pure-u-1'} style={{textAlign: 'left'}}>搜尋結果（只顯示100個）：</h4>
              <div className={'pure-u-1'}
                   style={{overflowY: 'scroll',
                           boxShadow: 'inset 0 1px 3px #ddd',
                           height: '100%', width: '100%',
                           height: '170px'}}>
                {this.state.cardOptionsFiltered.map((option, idx) => {
                  return <a className={'pure-g cardItem'} key={`options-${idx}-img`}
                            onClick={() => this.setMember(team, option, editIdx)}>
                    <div className={'pure-u-1-3 imgFrame'}>
                      <img key={`options-${idx}-img`}
                           src={linkGenerator(option.small_filename)}  />
                    </div>
                    <p className={'pure-u-2-3'}>
                      <span style={{verticalAlign: 'middle'}}>{option.label} <small>{option.evo}</small></span>
                    </p>
                  </a>
                })}
              </div>
              <div className={'pure-u-1'}>
                <button className={'pure-button button-success'} onClick={() => this.props.closeEditor()}>
                  完成
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  }
}

export default EditModal