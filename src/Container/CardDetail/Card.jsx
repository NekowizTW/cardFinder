import React       from 'react'
import { Link }    from 'react-router-dom'
import Tabs,
       { TabPane } from 'rc-tabs'

import EvoCard from './EvoCard'

import { getSenzaiByName }         from '../../Helper/StoreHelper'
import { tw_filenameFix,
         linkGenerator,
         reverseOptionsGenerator } from '../../Helper/RenderHelper'

const outerURL = `https://nekowiz.fandom.com/zh/wiki/卡片資料`;

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: '0'
    }
  }

  tabIndexChange (e) {
    this.setState({ tabIndex: e })
  }

  senzaiDetails (senzaiName, i) {
    const senzai = getSenzaiByName(senzaiName)
    const key    = senzai.filename.split(".")[0]
    return <tr key={`senzai-${i}-name-${key}`}>
      <td><img src={linkGenerator(senzai.filename)} key={`senzai-${i}-img-${key}`} /></td>
      <td><b>{senzai.name}</b><br />{senzai.info}</td>
    </tr>
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
          <div className={'pure-g'}>
            <div className={'senzaiList'} key={`card-${data.id}-senzaiArr`}>
              {data.senzaiArr.map((senzaiName, i) => {
                const senzai = getSenzaiByName(senzaiName);
                return <img src={linkGenerator(senzai.filename)} key={`card-${data.id}-senzai-${i}`} />;
              })}
              {data.senzaiLArr.length !== 0 && <span className={'legend'}>
                {data.senzaiLArr.map((senzaiName, i) => {
                  const senzai = getSenzaiByName(senzaiName);
                  return <img src={linkGenerator(senzai.filename)} key={`card-${data.id}-senzai-${i}`} />;
                })}
              </span>}
            </div>
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
        <div className={'pure-u-1 pure-u-md-3-5'}>
          <Tabs
            activeKey={this.state.tabIndex}
            onChange={this.tabIndexChange.bind(this)}
            renderTabBar={(props, DefaultTabBar) => {
              return <div className={'pure-menu pure-menu-horizontal pure-menu-scrollable'}>
                <ul className={'pure-menu-list'}>
                  {
                    props.panes.map(pane => {
                      const itemClass = `pure-menu-item ${props.activeKey === pane.key ? 'pure-menu-selected' : ''}`
                      return <li className={itemClass} key={pane.key}>
                        <a className={'pure-menu-link'} onClick={(a) => {
                          this.tabIndexChange(pane.key)
                        }}>{pane.props.tab}</a>
                      </li>
                    })
                  }
                </ul>
              </div>
            }}
          >
            <TabPane tab='一般型態' key='0'>
              <div className={'skillData as'}>
                <b>
                  {data.asData.name}<br />
                  <small>{data.asData.type}</small>
                </b>
                <p>
                  {data.asData.info}
                </p>
              </div>
              <div className={'skillData ss'}>
                <b>
                  {data.ssData.name}<span>{data.ssData.cdf}/{data.ssData.cds} Turns</span><br />
                  <small>{data.ssData.type}</small>
                </b>
                <p>
                  {data.ssData.info}
                </p>
              </div>
              { data.EXASData && 
                <div className={'skillData exas'}>
                  <b>【傳奇型態條件】</b>
                  <p>{data.EXASData.condition}</p>
                </div>
              }
            </TabPane>
            <TabPane tab='傳奇型態' key='1'>
              <div className={'skillData as'}>
                <b>
                  {data.as2Data.name}<br />
                  <small>{data.as2Data.type}</small>
                </b>
                <p>
                  {data.as2Data.info}
                </p>
              </div>
              <div className={'skillData ss'}>
                <b>
                  {data.ss2Data.name}<span>{data.ss2Data.cdf}/{data.ss2Data.cds} Turns</span><br />
                  <small>{data.ss2Data.type}</small>
                </b>
                <p>{data.ss2Data.info}</p>
              </div>
              { data.EXASData && 
                <div className={'skillData exas'}>
                  <b>
                      &nbsp;<br />
                      <small>{data.EXASData.type}</small>
                  </b>
                  <p>
                    {data.EXASData.info}
                  </p>
                </div>
              }
            </TabPane>
            <TabPane tab='潛在能力' key='2'>
              <div className={'senzaiList'}></div>
              <table style={{ border: 'none' }}>
                <tbody>
                  {data.senzaiArr.map(this.senzaiDetails)}
                </tbody>
              </table>
              <hr />
              <div className={'senzaiList Legend'}></div>
              <table style={{ border: 'none' }}>
                <tbody>
                  {data.senzaiLArr.map(this.senzaiDetails)}
                </tbody>
              </table>
            </TabPane>
            <TabPane tab='進化階段' key='3'>
              <EvoCard id={data.id} forward={0} self_card={true} />
            </TabPane>
          </Tabs>
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