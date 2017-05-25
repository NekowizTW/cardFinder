import React    from 'react';
import ReactDOM from 'react-dom';
import url      from 'url';
import location from 'location-href';
import _        from 'lodash';
import assign   from "object-assign";
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

import CardBase from './cardBase';
import CardSnap from './cardSnap';

import CardCollec from './Component/CardCollec.react';
import CardDetail from './Component/CardDetail.react';
import Console    from 'console-browserify';

import CardCollecAction from './Actions/CardCollecAction';

let url_parse = url.parse(location(), true);
let path = url_parse.href.replace(url_parse.hash, '');
let pageState = url_parse.hash;

function dataExist(data) {
    return (typeof data !== 'undefined' && data.length != 0);
}

function cardDataParse(data) {
  let res = data;
  for(let index in res.card) {
    let card = {
      evoArr: [],
      senzaiArr: [],
      senzaiLArr: [],
      asData: {},
      ssData: {},
      as2Data: {},
      ss2Data: {}
    };
    for(let i = 1; i <= 8; i++){
      if(dataExist(res.card[index]['evo_'+i])){
        card.evoArr.push(res.card[index]['evo_'+i]);
      }else break;
    }
    for(let i = 1; i <= 10; i++){
      if(dataExist(res.card[index]['senzai_'+i])){
        card.senzaiArr.push(res.card[index]['senzai_'+i]);
      }else break;
    }
    for(let i = 1; i <= 4; i++){
      if(dataExist(res.card[index]['senzaiL_'+i])){
        card.senzaiLArr.push(res.card[index]['senzaiL_'+i]);
      }else break;
    }
    if(dataExist(res.card[index].as)) card.asData = _.find(res.Answer, {'name': res.card[index].as}) || {'name': res.card[index].as, 'info': '尚無技能資料'};
    else card.asData = res.Answer[0];
    if(dataExist(res.card[index].ss)) card.ssData = _.find(res.Special, {'name': res.card[index].ss}) || {'name': res.card[index].ss, 'info': '尚無技能資料'};
    else card.ssData = res.Special[0];
    if(dataExist(res.card[index].as2)) card.as2Data = _.find(res.Answer2, {'name': res.card[index].as2}) || {'name': res.card[index].as2, 'info': '尚無技能資料'};
    else card.as2Data = res.Answer2[0];
    if(dataExist(res.card[index].ss2)) card.ss2Data = _.find(res.Special2, {'name': res.card[index].ss2}) || {'name': res.card[index].ss2, 'info': '尚無技能資料'};
    else card.ss2Data = res.Special2[0];
    assign(res.card[index], card);
  }

  return res;
}

function sourceDetect(){
  let pathname = url_parse.pathname;
  let source = url_parse.query.source || false;
  switch(pathname){
    case '/card.html':
      break;
    default:
      break;
  }
  if(source){
    CardBase.init(() => {
      let data_parsed = cardDataParse(CardBase.data_deck);
      CardCollecAction.parseSenzaiList(data_parsed.Senzai);
      CardCollecAction.parseCardList(data_parsed.card);
    });
  }else{
    CardSnap.init(path+'json/', (data) => {
      let data_parsed = cardDataParse(data);
      CardCollecAction.parseSenzaiList(data_parsed.Senzai);
      CardCollecAction.parseCardList(data_parsed.card);
    });
  }
}

ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path="/" component={CardCollec} />
      <Route path="/card/:cardId" component={CardDetail}/>
      <Route path="*" component={NoMatch} />
    </div>
  </HashRouter>
), document.getElementById('app'));

window.onload = () => {
  sourceDetect();
};

class NoMatch extends React.Component{
  constructor(){
    super();
  }
  render(){
    return;
  }
}
