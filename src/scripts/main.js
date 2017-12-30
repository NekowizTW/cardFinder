import React    from 'react';
import ReactDOM from 'react-dom';
import url      from 'url';
import location from 'location-href';
import _        from 'lodash';
import assign   from "object-assign";
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import CardBase from './cardBase';
import CardSnap from './cardSnap';

import CardCollec from './Component/CardCollec/CardCollec.container';
import CardDetail from './Component/CardDetail.react';
import TeamCollec from './Component/TeamCollec.react';
import TeamForm   from './Component/TeamForm/TeamForm.container';

import CardCollecAction from './Actions/CardCollecAction';

let url_parse = url.parse(location(), true);
let path = url_parse.href.replace(url_parse.hash, '');
let pageState = url_parse.hash;

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
      let data_parsed = CardBase.data_deck;
      CardCollecAction.parseSenzaiList(data_parsed.Senzai);
      CardCollecAction.parseCardList(data_parsed.card);
      renderMain();
    });
  }else{
    CardSnap.init( path+'json/', (data_parsed) => {
      CardCollecAction.initCardData({
        card: data_parsed.card,
        senzai: data_parsed.Senzai
      });
      renderMain();
    });
  }
}

function renderMLoading(){
  ReactDOM.render((React.DOM.div({id: 'loading___'}, "資料載入中 :3 ")), document.getElementById('app'));
}

function renderMain(){
  ReactDOM.render((
    <HashRouter>
      <div>
        <Route exact path="/" component={CardCollec} />
        <Route path="/card/:cardId" component={CardDetail}/>
        <Route exact path="/team/:teamList/:teamHelper" component={TeamCollec}/>
        <Route exact path="/team/:teamList" component={TeamCollec}/>
        <Route exact path="/teamform" component={TeamForm}/>
        <Route path="*" component={NoMatch} />
      </div>
    </HashRouter>
  ), document.getElementById('app'));

  class NoMatch extends React.Component{
    constructor(){
      super();
    }
    render(){
      return <Redirect to="/"/>
    }
  }
}

window.onload = () => {
  sourceDetect();
};

renderMLoading();