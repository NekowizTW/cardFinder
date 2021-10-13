import React      from 'react'
import { Link }   from 'react-router-dom'

import EvoCard from './EvoCard.react.js'

import { getSenzaiByName }         from '../../Helper/StoreHelper.js'
import { tw_filenameFix,
         linkGenerator,
         reverseOptionsGenerator } from '../../Helper/RenderHelper.js'

const outerURL = `https://nekowiz.fandom.com/zh/wiki/卡片資料`;

class Card extends React.Component {
  constructor (props) {
    super(props)
  }

  senzaiDetails (senzaiName, i) {
    const senzai = getSenzaiByName(senzaiName)
    const key    = senzai.filename.split(".")[0]
    return <li key={`senzai-${i}-name-${key}`}>
      <img src={linkGenerator(senzai.filename)} key={`senzai-${i}-img-${key}`} />
      {senzai.name}: {senzai.info}
    </li>
  }

  render () {
    const data           = this.props.data
    const card_filename  = tw_filenameFix(data.card_filename) || "0000.png"
    const small_filename = tw_filenameFix(data.small_filename) || "0000.png"
    // 1st State: Waiting for Data.
    if (Object.keys(data).length === 0 && data.constructor === Object)
      return (<div>等待卡片資料中...</div>)
    // 2nd State: No Data.
    else if (data.name.length === 0)
      return (<div>目前尚未有此卡片的資料，請<Link to={'/'}>點此返回</Link></div>)
    // 3rd State: Data loaded.
    else return (<div className="cardDetail">
      <div className={'pure-g'}>
        <div className={'pure-u-1 pure-u-md-2-5'}>
          <div className={'card_img'}>
            <img src={linkGenerator(card_filename)} />
          </div>
          <div className={'pure-g'}>
            <div className={'pure-u-1-3 pure-u-lg-1-5 small_img'}>
              <span className={'helper'}></span>
              <img src={linkGenerator(small_filename)} />
            </div>
            <div className={'pure-u-2-3 pure-u-lg-4-5'}>
              <h3>No. {data.id}<br /><span style={{'fontSize': 'x-large'}}>{data.name}</span></h3>
            </div>
          </div>
          <div className={'senzaiList'} key={`card-${data.id}-senzaiArr`}>
            {data.senzaiArr.map((senzaiName, i) => {
              const senzai = getSenzaiByName(senzaiName);
              return <img src={linkGenerator(senzai.filename)} key={`card-${data.id}-senzai-${i}`} />;
            })}
            {data.senzaiLArr.length !== 0 && <span style={{'width': '64px', 'display': 'inline-block'}}></span>}
            {data.senzaiLArr.length !== 0 && 
              data.senzaiLArr.map((senzaiName, i) => {
                const senzai = getSenzaiByName(senzaiName);
                return <img src={linkGenerator(senzai.filename)} key={`card-${data.id}-senzai-${i}`} />;
              })
            }
          </div>
          <table className={'pure-table pure-table-horizontal'} style={{'width': '90%'}}>
            <tbody>
              <tr><th>HP</th><td>{data.max_hp}</td></tr>
              <tr><th>攻擊</th><td>{data.max_atk}</td></tr>
              <tr><th>種族</th><td>{data.breed}</td></tr>
              <tr><th>進化</th><td>{data.evo_now} / {data.evo_max}</td></tr>
              <tr><th>Cost</th><td>{data.cost}</td></tr>
            </tbody>
          </table>
        </div>
        <div className={'pure-u-1 pure-u-md-3-5 detailTab'}>
          <div className={'tabs'}>
            <div className={'tab'}>
              <input type="radio" id="rd1" name="rd" defaultChecked />
              <label className={'tab-label'} htmlFor="rd1">一般型態</label>
              <div className={'tab-content'}>
                <div className={'skillData as'}>
                  <p><b>{data.asData.name}</b> <span>{data.asData.type}</span></p>
                  <p>{data.asData.info}</p>
                </div>
                <div className={'skillData ss'}>
                  <p><b>{data.ssData.name}({data.ssData.turn})</b> <span>{data.ssData.type}</span></p>
                  <p>{data.ssData.info}</p>
                </div>
                { data.EXASData && 
                  <div className={'skillData exas'}>
                    <p><b>【傳奇型態條件】</b></p>
                    <p>{data.EXASData.condition}</p>
                  </div>
                }
              </div>
            </div>
            <div className={'tab'}>
              <input type="radio" id="rd2" name="rd" />
              <label className={'tab-label'} htmlFor="rd2">傳奇型態</label>
              <div className={'tab-content'}>
                <div className={'skillData as'}>
                  <p><b>{data.as2Data.name}</b> <span>{data.as2Data.type}</span></p>
                  <p>{data.as2Data.info}</p>
                </div>
                <div className={'skillData ss'}>
                  <p><b>{data.ss2Data.name}({data.ss2Data.turn})</b> <span>{data.ss2Data.type}</span></p>
                  <p>{data.ss2Data.info}</p>
                </div>
                { data.EXASData && 
                  <div className={'skillData exas'}>
                    <p><b>&nbsp;</b> <span>{data.EXASData.type}</span></p>
                    <p>{data.EXASData.info}</p>
                  </div>
                }
              </div>
            </div>
            <div className={'tab'}>
              <input type="radio" id="rd3" name="rd" />
              <label className={'tab-label'} htmlFor="rd3">潛在能力</label>
              <div className={'tab-content'}>
                <ul className={'senzaiList'}>
                  {data.senzaiArr.map(this.senzaiDetails)}
                </ul>
                <hr />
                <ul className={'senzaiList Legend'}>
                  {data.senzaiLArr.map(this.senzaiDetails)}
                </ul>
              </div>
            </div>
            <div className={'tab'}>
              <input type="radio" id="rd4" name="rd" />
              <label className={'tab-label'} htmlFor="rd4">卡片進化途徑</label>
              <div className={'tab-content'}>
                <EvoCard id={data.id} forward={0} self_card={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={'pure-button-group'}>
        <Link to={'/'} className={'pure-button pure-button-primary'}>←返回搜尋頁面</Link>
        <a href={`${outerURL}/${data.id}`} className={'pure-button button-success'} target="_blank">連結到黑貓維基→</a>
      </div>
      <h4>基本屬性反查</h4>
      <div className={'pure-button-group'}>
        <Link to={{ pathname: '/', query: { props: reverseOptionsGenerator(data, 'prop') } }}
              className={'pure-button'}>
              主屬性：{data.prop}
        </Link>
        {data.prop2 &&
          <Link to={{ pathname: '/', query: { props: reverseOptionsGenerator(data, 'prop'),
                                              props2: reverseOptionsGenerator(data, 'prop2') } }}
                className={'pure-button'}>
                雙屬性：{data.prop}{data.prop2}
          </Link>
        }
        <Link to={{ pathname: '/', query: { breeds: reverseOptionsGenerator(data, 'breed') } }}
              className={'pure-button'}>
              種族：{data.breed}
        </Link>
      </div>
      <h4>AS技能反查</h4>
      <div className={'pure-button-group'}>
        <Link to={{ pathname: '/', query: { as: reverseOptionsGenerator(data, 'asData.type', /[・‧]+/) } }}
              className={'pure-button button-error'}>
              AS1: {data.asData.type}
        </Link>
        {data.as2 && 
          <Link to={{ pathname: '/', query: { as2: reverseOptionsGenerator(data, 'as2Data.type', /[・‧]+/) } }}
                className={'pure-button button-error'}>
                AS2: {data.as2Data.type}
          </Link>
        }
      </div>
      <h4>SS技能反查</h4>
      <div className={'pure-button-group'}>
        <Link to={{ pathname: '/', query: { ss: reverseOptionsGenerator(data, 'ssData.type') } }}
              className={'pure-button pure-button-primary'}>
              SS1: {data.ssData.type}
        </Link>
        {data.ss2 && 
          <Link to={{ pathname: '/', query: { ss2: reverseOptionsGenerator(data, 'ss2Data.type') } }}
                className={'pure-button pure-button-primary'}>
                SS2: {data.ss2Data.type}
          </Link>
        }
      </div>
      {data.EXASData && <div>
        <h4>EXAS技能反查</h4>
        <div className={'pure-button-group'}>
          <Link to={{ pathname: '/', query: { exasType: reverseOptionsGenerator(data, 'EXASData.type', /[・‧]+/) } }}
                className={'pure-button button-warning'}>
                EXAS: {data.EXASData.type}
          </Link>
        </div>
      </div>}
    </div>);
  }
}

export default Card