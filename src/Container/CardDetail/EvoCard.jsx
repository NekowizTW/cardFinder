import React      from 'react'
import { Link }   from 'react-router-dom'
import { logger } from 'log-prettier'

import { getCardById }   from '../../Helper/StoreHelper'
import { tw_filenameFix,
         linkGenerator } from '../../Helper/RenderHelper'

const outerURL = `https://nekowiz.fandom.com/zh/wiki/卡片資料`;

// siblingTester: Testing card's evolution path
//  -      id:   card's id
//  - forward:   tracking forward(1) or backward(-1)
//  - self_card: prevent start point id to be in list if set to true.
function siblingTester (id, forward, self_card = false) {
  logger.debug(`[siblingTest] Track id: ${id}, forward: ${forward}`)
  let evoList = []
  // Terminal Condition: the front id is blank, return blank evoList
  if (id === '') {
    return evoList;
  } else {
    const data = getCardById(id)
    // Exception: card data undefined.
    if (data === undefined) return evoList;
    // backward tracking
    if (forward <= 0) {
      // Exception: two cards' evolution are the same
      // Example: Chocolate Forest Mission
      //          Pacha evolute from 2 types of perfume
      //          Muma evolute from 2 types of cake
      if (data.evo_from.indexOf(',') !== -1) {
        let evo_from2way = data.evo_from.split(',');
        if (!self_card) evoList.push(data.id);
        evoList.push(
          siblingTester(evo_from2way[0], forward),
          siblingTester(evo_from2way[1], forward)
        );
      } else {
        if (!self_card) evoList.push(data.id);
        evoList.push(...siblingTester(data.evo_from, forward));
      }
    }
    // forward tracking
    if (forward >= 0) {
      if(!self_card) evoList.push(data.id);
      evoList.push(...siblingTester(data.evo_to, forward));
    }
  }
  logger.debug(`[siblingTest] Complete id: ${id}, forward: ${forward}, list: ${evoList}`);
  return evoList;
}

class EvoCard extends React.Component {
  constructor (props) {
    super(props);
  }

  // generateCard: Generate Full Evolution Path
  //  -           id: card's id
  //  -    self_card: some feature may trigger if this is self card (evolution assets)
  //  - disable_down: disable down arrow
  generateCard (id, self_card = false, disable_down = false) {
    const data = getCardById(id);
    const small_filename = tw_filenameFix(data.small_filename) || "0000.png";
    return (
      <div className={'pure-u-1 evoNode'} key={`evo-card-${data.id}`}>
        <div className={'pure-g'}>
          <div className={`pure-u-1 small_img ${(self_card? 'self_card':'')}`}>
            <Link to={'/card/'+data.id} key={`card-${data.id}-name`}>
              <img src={linkGenerator(small_filename)} />
            </Link>
          </div>
          <div className={`evoSpace${disable_down ? '' : ' down-arrow'}`}></div>
        </div>
      </div>
    );
  }

  str2chainTrack (str, name) {
    const re = /\{\{Card\/Data\/(\d*)\|data=EvoChain2\}\}/gmi;
    let m, sub = [], cnt = 0;
    while ((m = re.exec(str)) !== null) {
      if (m[1].length === 0) continue
      else sub.push(m[1]);
    }
    res.push(<div className={`${name} pure-u-1`} key={`${id}-${name}-cont`}>
      <div className={'pure-g'}>
        {sub.map((subId, idx) => <div className={`pure-u-1-${sub.length}`} key={`${subId}-${name}-${cnt}`}>
          <EvoCard id={subId} key={`${subId}-${name}-${cnt}`} />
        </div>)}
      </div>
    </div>);
  }

  render () {
    const id = this.props.id;
    const forward = this.props.forward || 0;
    const self_card = this.props.self_card || false
    logger.debug(`[EvoCard] At: ${id}`)
    // if the front id is blank, return blank div
    if (id === '') {
      return (<div></div>);
    }
    // Evo Path Tracking
    const data = getCardById(id)
    let res = [];
    const node = [
      data.evo_chain_before_note, // special path: backward
      data.evo_chain_branch,      // special path: sibling
      data.evo_chain_after_note   // special path: forward
    ];
    const node_name = ['evoBak', 'evoBnc', 'evoFwd'];
    
    // special path: backward
    if ((node[0].length) !== 0 && self_card) str2chainTrack(node[0], node_name[0]);
    // general path: backward
    const evo_last = siblingTester(data.id, -1, true);
    const evo_last_arrays = _.countBy(evo_last, e => typeof e).object || 0;
    res.push(evo_last.reverse().map(id => {
      if(typeof id === 'object'){
        return (
          <div className={`evo_node  pure-u-1-${evo_last_arrays}`}>
            <div className={'pure-g'}>
              {id.map(sub_id => {
                return (
                  <div className={'pure-u-1'} key={`${node_name[0]}-${sub_id}`}>
                    {this.generateCard(sub_id)}
                  </div>
                 );
              })}
            </div>
          </div>
        );
      } else {
        return this.generateCard(id);
      }
    }));
    // general path: Self
    res.push(this.generateCard(id, self_card, data.evo_max === '1'));
    // general path: Prepare evolution assets table
    if (data.evo_to !== '') {
      res.push(<div className={'pure-u-1'} key={`evo-assets-list`}>
        <div className={'pure-g'}>
          <h4 className={'pure-u-1'}>進化合成需要素材</h4>
          {data.evoArr.map((evo_item, idx) => {
            const data = getCardById(evo_item)
            const small_filename = (data === undefined ? `${evo_item}.png` : data.small_filename)
            const link2data = (data === undefined ? `${outerURL}/${evo_item}` : `/card/${data.id}`)
            // some assets are not in our data collection but on wiki, we can redirect them to wiki.
            if (data === undefined) {
              return (
                <div className={'pure-u-1-4 small_img'} key={`evo-assets-${idx}`}>
                  <a href={link2data} key={`evo-assets-${idx}-l`} target={'_blank'}>
                    <img src={linkGenerator(small_filename)} />
                  </a>
                </div>
              )
            } else {
              return (
                <div className={'pure-u-1-4 small_img'} key={`evo-assets-${idx}`}>
                  <Link to={link2data}  key={`evo-assets-${idx}-l`}>
                    <img src={linkGenerator(small_filename)} />
                  </Link>
                </div>
              )
            }
          })}
          <h4 className={'pure-u-1'}>需要金幣：{data.evo_price}</h4>
          <div className={'down-arrow'}></div>
        </div>
      </div>);
    }
    // general path: forward
    res.push(siblingTester(data.id, 1, true).map((id, idx, arr) => {
      return this.generateCard(id, false, idx === (arr.length - 1))
    }));
    // special path: evo_chain_branch
    if((node[1].length) !== 0 && self_card) str2chainTrack(node[1], node_name[1]);
    // special path: evo_chain_after_note
    if((node[2].length) !== 0 && self_card) str2chainTrack(node[2], node_name[2]);
    // global generate
    return (<div className={'pure-g evoPath'} key={`evo-basedOn-${id}`}>
      {res.map(sub_node => sub_node)}
    </div>);
  }
}

export default EvoCard