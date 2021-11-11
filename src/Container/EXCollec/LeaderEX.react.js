import React       from 'react'
import TextFilter  from 'react-text-filter'
import Select      from 'react-select'

import { tw_filenameFix,
         linkGenerator }   from '../../Helper/RenderHelper.js'

class LeaderEX extends React.Component {
  constructor(props) {
    super(props)
    const sourceObj = this.props.leaderEXs.reduce((last, card) => {
      const key = `${card.name}(${card.rank.replace(/\d/, '')})`
      
      if (Object.keys(last).indexOf(key) >= 0)
        last[key].types.push({ condition: card.condition, skill: card.skill })
      else
        last[key] = {
          name: key,
          small_filename: card.small_filename,
          types: [{
            condition: card.condition,
            skill: card.skill
          }]
        }

      return last
    }, {})
    const source = Object.entries(sourceObj)
      .map(o => {
        o[1].types = o[1].types.sort((a, b) => ('' + a.condition).localeCompare(b.condition))
        return o[1];
      })
      .sort((a, b) => ('' + a.name).localeCompare(b.name))
    this.state = {
      filterText: '',
      src: source,
      filted: source
    }
  }

  filterChange (type) {
    return (obj) => {
      const vals = obj.target.value.toLowerCase().split(' ')
      const filted = this.state.src.filter(o => vals.every(val => {
        if (o.name.toLowerCase().indexOf(val) >= 0) return true;
        return o.types.some(t => t.condition.indexOf(val) >= 0 || t.skill.indexOf(val) >= 0)
      })).map(o => {
        if (vals.every(val => {
          if (o.name.toLowerCase().indexOf(val) >= 0) return true;
          return false;
        })) return o;

        o.types = o.types.filter(t => vals.every(val => {
          return (t.condition.indexOf(val) >= 0 || t.skill.indexOf(val) >= 0)
        }))

        return o;
      })
      this.setState({ filterText: obj.target.value, filted: filted })
    }
  }

  resetFilter (e) {
    this.setState({ filterText: '', filted: this.state.src })
  }

  render() {
    const _this = this;
    function highlightString (str, key) {
      if (_this.state.filterText.length === 0) return str;

      let mark = _this.state.filterText.split(' ').reduce((last, token) => {
        const start = str.indexOf(token);
        if (start === -1) return last;

        last.fill(true, start, start + token.length);
        return last;
      }, new Array(str.length).fill(false));

      let arr = [], offset = 0;

      for (let i = 1; i < mark.length; i++) {
        if (mark[i] === mark[i - 1]) continue;

        arr.push([str.slice(0, i - offset), mark[i - 1]]);
        str = str.slice(i - offset);
        offset = i;
      }
      if (str.length !== 0) arr.push([str, mark[mark.length - 1]]);
      return <p>
        {arr.map((o, idx) => <span key={`${key}-${idx}`} className={`${o[1] ? 'highlight' : ''}`}>{o[0]}</span>)}
      </p>
    }

    function cardItem (data, idx) {
      const small_filename = tw_filenameFix(data.small_filename) || '0000.png'

      return (<div className={'pure-u-1 excard-container'} key={`excard-${data.name}-container`}>
        <div className={'excard'} key={`excard-${data.name}-card`}>
          <img key={`card-${data.name}-img`} src={linkGenerator(small_filename)} />
          <div className={'info'}>
            <div className={'pure-g'}>
              <h3 key={`card-${data.name}-name`} className={'leaderEXCard pure-u-1 pure-u-md-1-3'}>{highlightString(data.name)}</h3>
              <div className={'pure-u-1 pure-u-md-2-3'}>
                {data.types.map((o, i) => <label key={`excard-${data.name}-typeLabel-${i}`}
                                                    className={`${i === 0 ? 'active' : ''}`}
                                                    htmlFor={`excard-${data.name}-type-${i}`}>{i + 1}</label>)}
              </div>
            </div>
            {data.types.map((type, i) => <div key={`excard-${data.name}-typetab-${i}`} className={'excard-tab'}>
              <input id={`excard-${data.name}-type-${i}`}
                     key={`excard-${data.name}-typeinput-${i}`}
                     name={`excard-${data.name}-typeinput`}
                     type={'radio'}
                     onChange={(e) => {
                       document.querySelectorAll(`label[for^="excard-${data.name}-type-"]`).forEach(el => el.classList.remove('active'));
                       document.querySelector(`label[for="excard-${data.name}-type-${i}"]`).classList.add('active');
                     }}
                     defaultChecked={i === 0} />
              <div className={'detail'}>
                <p>條件：{highlightString(type.condition, `card-${idx}-type${i}-condition`)}</p>
                <hr />
                <p>技能：{highlightString(type.skill, `card-${idx}-type${i}-skill`)}</p>
              </div>
            </div>)}
          </div>
        </div>
      </div>);
    }

    return <div id="EXCardsForm">
      <div className={'pure-form pure-g'}>
        <div className={'pure-u-1'}>
          <button
            type='button'
            className={'pure-button pure-button-primary'}
            onClick={() => _this.props.changeSubPage()}
          >切換至精靈結晶</button>
        </div>
        <TextFilter
          filter={this.state.filterText} onFilter={this.filterChange.bind(this)('filterText')}
          debounceTimeout={500} minLength={1}
          placeholder={'請輸入結晶的部份關鍵字'} className={'pure-u-5-6'}
        />
        <button
          type='button'
          className={'button-error pure-button pure-u-1-6 reset_btn'}
          onClick={this.resetFilter.bind(this)}
        ><i className={'fa fa-ban'} aria-hidden="true"></i><span>重置</span></button>
      </div>
      <div className={'pure-g'}>
        {this.state.filted.map(cardItem)}
      </div>
    </div>
  }
}

export default LeaderEX