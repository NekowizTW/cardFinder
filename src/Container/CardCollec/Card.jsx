import React    from 'react'
import { Link } from 'react-router-dom'

import Action              from '../../Redux/Action';
import { getCardById,
         getSenzaiByName } from '../../Helper/StoreHelper'
import { tw_filenameFix,
         linkGenerator }   from '../../Helper/RenderHelper'

class Card extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      team: props.team
    }
  }

  toggleSelect (id) {
    let team = this.state.team
    if (id === 0) {
      team.selected = [];
    } else {
      const idx = team.selected.indexOf(id)
      if (idx > -1)
        team.selected.splice(idx, 1)
      else
        team.selected.push(id)
    }
    this.setState( { team: team }, () => {
      Action.updateTeam(team)
    })
  }

  render () {
    const cards = this.props.CardData
    const cardHandler = this

    function cardItem (data) {
      const small_filename = tw_filenameFix(data.small_filename) || '0000.png'
      const hover = cardHandler.state.team.selected.indexOf(data.id) > -1 ? 'selected' : ''

      return (<div key={`card-${data.id}-base`} className={`cardItem pure-g ${hover}`}>
        <div key={`card-${data.id}-imgFrame`} className={'pure-u-1-6 imgFrame'}>
          <img key={`card-${data.id}-img`} src={linkGenerator(small_filename)}
               onClick={() => cardHandler.toggleSelect(data.id)} />
        </div>
        <div key={`card-${data.id}-nameFrame`} className={'pure-u-2-3 profileFrame'}>
          {data.obtainType &&
            <span className={data.obtainType.type === 'haifu' ? 'circleMark' : ''}>
              {data.obtainType.type === 'haifu' ? '配':''}
            </span>
          }
          <Link key={`card-${data.id}-name`} to={`/card/${data.id}`}>
            No. {data.id} <br />
            {data.name}
          </Link>
          <div key={`card-${data.id}-profile`} className={'pure-g'}>
            <p key={`card-${data.id}-breed`} className={'pure-u-1-3'}>{data.breed}</p>
            <p key={`card-${data.id}-evo`} className={'pure-u-1-3'}>{data.evo_now+'/'+data.evo_max}</p>
            <p key={`card-${data.id}-cost`} className={'pure-u-1-3'}>{data.cost}</p>
          </div>
          <div key={`card-${data.id}-senzaiArr`} className={'senzaiList'}>
            {data.senzaiArr.map((senzaiName, i) => {
              const senzai = getSenzaiByName(senzaiName);
              return <img key={`card-${data.id}-senzai-${i}`} src={linkGenerator(senzai.filename)} />;
            })}
            {data.senzaiLArr.length > 0 &&
              <span className={'legend'}>
                {data.senzaiLArr.map((senzaiLName, i) => {
                  const senzai = getSenzaiByName(senzaiLName);
                  return <img key={`card-${data.id}-senzaiL-${i}`} src={linkGenerator(senzai.filename)} />;
                })}
              </span>
            } 
          </div>
        </div>
        <p key={`card-${data.id}-hpatk`} className={'pure-u-1-6 numberFrame'}>
          <span>{data.max_hp}</span><br/>
          <span>{data.max_atk}</span><br/>
          {data.ssData.turn && <span>{data.ssData.cdf}/{data.ssData.cds}</span>}&nbsp;
          {data.ss2Data.turn && <span>{data.ss2Data.cdf}/{data.ss2Data.cds}</span>}
        </p>
      </div>);
    }
    function selectedNotify () {
      const len = cardHandler.state.team.selected.length;
      if (len == 0)
        return (<div>
          <p className={'pure-u-1'}>
            點擊卡片縮圖可以選取卡片，選取的卡片可以作為其他用途
          </p>
        </div>);
      else
        return (<div className={'cardItem pure-g'}>
          <p className={'pure-u-1'}>
            你已經選擇了 {len} 張卡片，可以使用以下功能
          </p>
          <div className={'pure-u-1'}>
            <Link to={'/team/'} className={'pure-button'}>卡片組隊</Link>
            <button className={'pure-button button-error'} onClick={(e) => {cardHandler.toggleSelect(0)}}>
              清除選擇
            </button>
          </div>
        </div>);
    }
    return (<div>
      {selectedNotify()}
      {cards.map(cardItem)}
    </div>);
  }
}

export default Card;
