import React       from 'react'
import TextFilter  from 'react-text-filter'
import Select      from 'react-select'

import { getSenzaiByName } from '../../Helper/StoreHelper.js'

import { tw_filenameFix,
         linkGenerator }   from '../../Helper/RenderHelper.js'

const baseURL = 'https://nekowiz.fandom.com/zh/wiki/'

function parseSource (source) {
  const sourceArr = source.split(/<br\s*\/?>/i)
  const re = /[\{\[]{2}(.*)[\}\]]{2}/gm
  const m = re.exec(sourceArr[0])

  if (m === null)
    return { text: sourceArr, link: null }
  if (m[1].indexOf('取得來源') >= 0)
    return { text: sourceArr.slice(1), link: { text: '結晶化', href: `${baseURL}結晶化` } }

  const split = m[1].indexOf('|')
  return {
    text: [sourceArr[0].replace(m[0], ''), ...sourceArr.slice(1)],
    link: { text: m[1].slice(split + 1), href: `${baseURL}${m[1].slice(0, split - 1)}` }
  }
}

class EXCards extends React.Component {
  constructor(props) {
    super(props)
    const source = this.props.EXCards.map(card => {
      const senzai = getSenzaiByName(card['senzai_1']);
      return {
        id: parseInt(card.id),
        name: card.name,
        small_filename: card.small_filename,
        description: senzai.info.length === 0 ? senzai.name : senzai.info,
        source: parseSource(card.get_source)
      }
    }).filter(o => o.name.length > 0)
      .sort((a, b) => a.id - b.id)
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
        if (o.description.toLowerCase().indexOf(val) >= 0) return true;
        return false;
      }))
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

      return (<div className={'pure-u-1 pure-u-md-1-2 excard-container'} key={`excard-${data.id}-container`}>
        <div className={'excard'} key={`excard-${data.id}-card`}>
          <img key={`card-${data.id}-img`} src={linkGenerator(small_filename)} />
          <div className={'info'}>
            <h3 key={`card-${data.id}-name`}>{data.name}</h3>
            <p className={'detail'}>{highlightString(data.description, `card-${idx}`)}</p>
            <p className={'source'}>
              取得來源：
              <span>{data.source.link && <a href={data.source.link.href}>{data.source.link.text}</a>}</span>
              <span>{data.source.text.map((o, i) => <span key={`card-${idx}-${i}`}>{o}</span>)}</span>
            </p>
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
          >切換至精靈大結晶</button>
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

export default EXCards