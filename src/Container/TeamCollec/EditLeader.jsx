import React  from 'react'
import Select from 'react-select'
import Modal  from 'react-modal'

import Action                     from '../../Redux/Action'
import Store                      from '../../Redux/Store'
import { twFilenameFix,
         linkGenerator }          from '../../Helper/RenderHelper'

const customStyles = {
  content: {
    width: '80%',
    height: '100%',
    maxWidth: '500px',
    maxHeight: '500px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const formatOptionLabel = ({ value, label, condition, skill }) => (
  <div style={{ display: 'flex' }}>
    <div>{label}</div>
    <div style={{ marginLeft: '10px', color: '#aaa', textAlign: 'left' }}>
      {condition} <br />
      {skill}
    </div>
  </div>
);

class EditLeader extends React.Component {
  constructor (props) {
    super(props)

    const _this = this
    const unsubscribe = Store.subscribe(() => {
      const leaderEXOptions = [{ label: '無結晶', value: '', condition: '無', skill: '無', small_filename: '0000.png'},
      ...Store.getState().SourceLeaderEXCards.map(card => {
        return {
          label: `${card.name} ${card.rank.replace(/\d+/, '')}`,
          condition: card.condition,
          skill: card.skill,
          value: `${card.name}${card.rank}`,
          small_filename: card.small_filename
        }
      })]
      _this.setState({
        leaderEXOptions: leaderEXOptions
      })
    })

    this.state = {
      leaderEXOptions: [{ label: '無結晶', value: '', condition: '無', skill: '無', small_filename: '0000.png'}],
      visible: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    const visible = props.editLeader
    const leaderEXOptions = [{ label: '無結晶', value: '', condition: '無', skill: '無', small_filename: '0000.png'},
      ...Store.getState().SourceLeaderEXCards.map(card => {
        return {
          label: `${card.name} ${card.rank.replace(/\d+/, '')}`,
          condition: card.condition,
          skill: card.skill,
          value: `${card.name}${card.rank}`,
          small_filename: card.small_filename
        }
      })
    ]
    return {
      visible: visible,
      leaderEXOptions: leaderEXOptions
    }
  }

  setLeader (team, option) {
    console.log(option)
    const id = option.value
    team.leaderEX = id
    Action.updateTeam(team)
  }

  getLeader (value) {
    return this.state.leaderEXOptions.find(option => option.value === value)
  }

  forceUpdate () {
    const team = this.props.team
    Action.updateTeam(team)
    return this.getLeader(team)
  }

  render () {
    if (!this.props.editLeader) return <div></div>
    const team = this.props.team
    const leaderEX = this.getLeader(team.leaderEX)
    console.log([this.state, team.leaderEX])
    if (this.props.editIdx === -1) return <div></div>
    return <div>
      <Modal contentLabel={'編輯大結晶'}
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
          <h2 className={'pure-u-1'}>正在編輯大結晶</h2>
          <div className={'pure-u-1 pure-u-md-1-3 imgFrame center-middle'}>
            <img key={`EditLeader-img`}
                 src={linkGenerator(leaderEX.small_filename)} />
          </div>
          <div className={'pure-u-1 pure-u-md-2-3'}>
            <h4>{leaderEX.label}</h4>
            <div className={'leaderEX'}>
              <p>{leaderEX.condition}</p>
              <p>{leaderEX.skill}</p>
            </div>
          </div>
          <hr className={'pure-u-1'} />
          <div className={'pure-u-1'}>
            <Select
              defaultValue={leaderEX}
              formatOptionLabel={formatOptionLabel}
              options={this.state.leaderEXOptions}
              onChange={(obj) => {this.setLeader(team, obj)}}
              maxMenuHeight={200}
            />
          </div>
          <div className={'pure-u-1'}>
            <button className={'pure-button button-success'} onClick={() => this.props.closeEditor()}>
              完成
            </button>
          </div>
        </div>
      </Modal>
    </div>
  }
}

export default EditLeader
