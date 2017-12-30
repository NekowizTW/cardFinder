import React    from 'react';
import ReactDOM from 'react-dom';
import Crypto   from 'crypto';
import jsonp    from 'jsonp-es6';
import _        from 'lodash';
import { Link } from 'react-router-dom';

import CardCollecStore  from '../Store/CardCollecStore';
import Console    from 'console-browserify';

function tw_filenameFix(name) {
  let filename = String(name).split(' ').join('_');
  return filename.charAt(0).toUpperCase() + filename.slice(1);
}
function linkGenerator(filename) {
  let rand = Math.floor((Math.random() * 4) + 1);
  let md5name = Crypto.createHash('md5').update(filename).digest('hex');
  return 'https://vignette'+rand+'.wikia.nocookie.net/nekowiz/images/'+md5name.charAt(0)+'/'+md5name.charAt(0)+md5name.charAt(1)+'/'+filename+'/revision/latest?path-prefix=zh';
}
function getCardById(id){
  return CardCollecStore.getCardById(id);
}

class EvoCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    function siblingTester(id, forward, self_card = false){
      Console.log('Test id: '+id+', forward: '+forward);
      let evoList = [];
      if(id === ''){
        return evoList;
      }else{
        let data = getCardById(id);
        if(forward <= 0) {
          if(data.evo_from.indexOf(',') !== -1){
            let evo_from2way = data.evo_from.split(',');
            if(!self_card) evoList.push(data.id);
            evoList.push(
              siblingTester(evo_from2way[0], forward),
              siblingTester(evo_from2way[1], forward)
            );
          }else{
            if(!self_card) evoList.push(data.id);
            evoList = evoList.concat(siblingTester(data.evo_from, forward));
          }
        }
        if(forward >= 0){
          if(!self_card) evoList.push(data.id);
          evoList = evoList.concat(siblingTester(data.evo_to, forward));
        }
      }
      Console.log('Test Complete id: '+id+', forward: '+forward);
      Console.log(evoList);
      return evoList;
    }
    function generateCard(id, self_card = false){
      let data = getCardById(id);
      let small_filename = tw_filenameFix(data.small_filename) || "0000.png";
      return (
        <div className={'pure-u-1'}>
          <div className={'pure-g'}>
            <div className={'pure-u-1 small_img '+(self_card? 'self_card':'')}>
              <Link to={'/card/'+data.id} key={'card-'+data.id+'-name'}>
                <img src={linkGenerator(small_filename)} />
              </Link>
            </div>
            <div className={'down-arrow'}></div>
          </div>
        </div>
      );
    }
    let id = this.props.id;
    let forward = this.props.forward || 0;
    let self_card = this.props.self_card || false;
    Console.log('At: '+id);
    if(id === ''){
      return (<div></div>);
    }
    let data = getCardById(id);
    let res = [];
    let node = [
      data.evo_chain_before_note,
      data.evo_chain_branch,
      data.evo_chain_after_note
    ];
    let node_name = ['evo_before_node', 'evo_branch_node', 'evo_after_node'];
    let re = /\{\{Card\/Data\/(\d*)\|data=EvoChain2\}\}/gmi;
    if((node[0].length) !== 0 && self_card){
      let m, sub = [];
      while ((m = re.exec(node[0])) !== null) {
        if(m[1].length === 0) continue;
        else sub.push(<EvoCard id={m[1]} />);
      }
      res.push(<div className={node_name[0]+' pure-u-1'}><div className={'pure-g'}>{sub.map(function(sub_node){ return <div className={'pure-u-1-'+sub.length}>{sub_node}</div>;})}</div></div>);
    }
    let evo_last = siblingTester(data.id, -1, true), evo_last_arrays = _.countBy(evo_last, function(e){return typeof e;}).object || 0;
    res.push(evo_last.reverse().map(function(id){
      if(typeof id === 'object'){
        return (
          <div className={node_name[0]+' pure-u-1-'+evo_last_arrays}>
            <div className={'pure-g'}>
              {id.map(function(sub_id){
                return (
                  <div className={'pure-u-1'}>
                    {generateCard(sub_id)}
                  </div>
                 );
              })}
            </div>
          </div>
        );
      }else{
        return generateCard(id);
      }
    }));
    res.push(generateCard(id, true));
    if(data.evo_to !== ''){
      res.push(<div className={'pure-u-1'}>
        <div className={'pure-g'}>
          <h4 className={'pure-u-1'}>進化合成需要素材</h4>
          {data.evoArr.map(function(evo_item){
            let data = getCardById(evo_item);
            let small_filename = tw_filenameFix(data.small_filename) || "0000.png";
            return (
              <div className={'pure-u-1-4 small_img'}>
                <Link to={'/card/'+data.id} key={'card-'+data.id+'-name'}>
                  <img src={linkGenerator(small_filename)} />
                </Link>
              </div>
            );
          })}
          <h4 className={'pure-u-1'}>需要金幣：{data.evo_price}</h4>
          <div className={'down-arrow'}></div>
        </div>
      </div>);
    }
    res.push(siblingTester(data.id, 1, true).map(function(id){
        return generateCard(id);
    }));
    if((node[1].length) !== 0 && self_card){
      let m, sub = [];
      while ((m = re.exec(node[1])) !== null) {
        if(m[1].length === 0) continue;
        else sub.push(<EvoCard id={m[1]} />);
      }
      res.push(<div className={node_name[1]+' pure-u-1'}><div className={'pure-g'}>{sub.map(function(sub_node){ return <div className={'pure-u-1-'+sub.length}>{sub_node}</div>;})}</div></div>);
    }
    if((node[2].length) !== 0 && self_card){
      let m, sub = [];
      while ((m = re.exec(node[2])) !== null) {
        if(m[1].length === 0) continue;
        else sub.push(<EvoCard id={m[1]} />);
      }
      res.push(<div className={node_name[2]+' pure-u-1'}><div className={'pure-g'}>{sub.map(function(sub_node){ return <div className={'pure-u-1-'+sub.length}>{sub_node}</div>;})}</div></div>);
    }
    Console.log(res);
    return (<div className={'pure-g'}>{res.map(function(sub_node){ return sub_node;})}</div>);
  }
}

class CardDetail extends React.Component {
  constructor(props) {
    super(props);
    let cardId = props.match.params.cardId || '0';
    let card = getCardById(cardId) || {};
    this.state = {
      cardId: cardId,
      data: card,
      legend: false
    };
    this.legendToggle = this.legendToggle.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  componentWillReceiveProps(props) {
    Console.log(props);
    let cardId = props.match.params.cardId || '0';
    let card =  getCardById(cardId) || {};
    this.setState ({
      cardId: cardId,
      data: card,
      legend: false
    });
  }
  changeHandler(){
    let cardId = this.state.cardId;
    let card = getCardById(cardId) || {};
    this.setState({data: card});
  }
  legendToggle() {
    let legend = this.state.legend;
    this.setState({'legend': !legend});
  }
  render() {
    function senzaiElems(senzaiName, i){
      let senzai = CardCollecStore.getSenzaiByName(senzaiName);
      let key = senzai.filename.split(".")[0];
      return <li key={'senzai-'+i+'-name-'+key}><img src={linkGenerator(senzai.filename)} key={'senzai-'+i+'-img-'+key} />{senzai.name}: {senzai.info}</li>;
    }
    let data = this.state.data;
    let card_filename = tw_filenameFix(data.card_filename) || "0000.png";
    let small_filename = tw_filenameFix(data.small_filename) || "0000.png";
    if(Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object) return (<div>等待卡片資料中...</div>);
    else if(this.state.data.name.length === 0) return (<div>目前尚未有此卡片的資料，請<Link to={'/'}>點此返回</Link></div>);
    else return (<div className="cardDetail">
      <div className={'pure-g'}>
        <div className={'pure-u-1 pure-u-md-1-2 card_img'}>
          <img src={linkGenerator(card_filename)} /> <br />
          <button className={'button-warning pure-button ' + (data.rank.indexOf('L')!==-1? '':'hide')} onClick={this.legendToggle}>{this.state.legend? '傳奇型態':'一般型態'}</button>
        </div>
        <div className={'pure-u-1 pure-u-md-1-2'}>
          <div className={'pure-g'}>
            <div className={'pure-u-1-3 small_img'}>
              <img src={linkGenerator(small_filename)} />
            </div>
            <div className={'pure-u-2-3'}>
              <h3>No. {data.id} - {data.name}</h3>
            </div>
          </div>
          <div className={'pure-g'}>
            <div className={'pure-u-1-2'}>
              <p>HP: {data.max_hp}</p>
            </div>
            <div className={'pure-u-1-2'}>
              <p>ATK: {data.max_atk}</p>
            </div>
          </div>
          <div className={'pure-g'}>
            <div className={'pure-u-1-2'}>
              <p>{data.breed}</p>
            </div>
            <div className={'pure-u-1-2'}>
              <p>Cost {data.cost}</p>
            </div>
          </div>
          <div className={'pure-g'}>
            <div className={'pure-u-1 asData '+(this.state.legend? 'hide':'')}>
              <p><b>{data.asData.name}</b> <span>{data.asData.type}</span></p>
              <p>{data.asData.info}</p>
            </div>
            <div className={'pure-u-1 ssData '+(this.state.legend? 'hide':'')}>
              <p><b>{data.ssData.name}({data.ssData.turn})</b> <span>{data.ssData.type}</span></p>
              <p>{data.ssData.info}</p>
            </div>
            <div className={'pure-u-1 asData '+(this.state.legend? '':'hide')}>
              <p><b>{data.as2Data.name}</b> <span>{data.as2Data.type}</span></p>
              <p>{data.as2Data.info}</p>
            </div>
            <div className={'pure-u-1 ssData '+(this.state.legend? '':'hide')}>
              <p><b>{data.ss2Data.name}({data.ss2Data.turn})</b> <span>{data.ss2Data.type}</span></p>
              <p>{data.ss2Data.info}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={'pure-u-1 pure-u-md-1-2'}>
        <ul className={'senzaiList '+(this.state.legend? 'hide':'')}>
          {data.senzaiArr.map(senzaiElems)}
        </ul>
        <ul className={'senzaiList Legend '+(this.state.legend? '':'hide')}>
          {data.senzaiLArr.map(senzaiElems)}
        </ul>
      </div>
      <div className={'pure-u-1 pure-u-md-1-2'} id={'evoListDisplay'}>
        <h3>卡片進化途徑</h3>
        <EvoCard id={data.id} forward={0} self_card={true} />
      </div>
      <Link to={{ pathname: '/', query: { props: data.prop } }} className={'pure-button'}>查看{data.prop}屬性卡片</Link>
      <Link to={{ pathname: '/', query: { props2: data.prop2 } }} className={'pure-button'}>查看{data.prop2}副屬性卡片</Link>
      <Link to={{ pathname: '/', query: { breeds: data.breed } }} className={'pure-button'}>查看{data.breed}卡片</Link>
      <Link to={{ pathname: '/', query: { ranks: data.rank } }} className={'pure-button'}>查看{data.rank}級卡片</Link>
      <Link to={'/'} className={'pure-button pure-button-primary'}>←返回搜尋頁面</Link>

    </div>);
  }
}

export default CardDetail;
