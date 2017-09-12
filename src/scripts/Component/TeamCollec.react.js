import React    from 'react';
import ReactDOM from 'react-dom';
import _        from 'lodash';
import Crypto   from 'crypto';
import { Link, withRouter } from 'react-router-dom';
import Console  from 'console-browserify';

import CardCollecAction from '../Actions/CardCollecAction';
import CardCollecStore  from '../Store/CardCollecStore';

import *          as cssTag from '../css_tags';

const textStyle = {
  'fill': '#000000',
  'textAnchor': 'middle'
};

const progressColors = {
  '火': {
    trackColor: '#FF7E7E',
    progressColor: '#DC2727'
  },
  '水': {
    trackColor: '#C6C8D9',
    progressColor: '#313DA6'
  },
  '雷': {
    trackColor: '#FFFDDE',
    progressColor: '#E2DA39'
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function tw_filenameFix(filename) {
  return String(filename).charAt(0).toUpperCase() + String(filename).slice(1);
}
function linkGenerator(filename) {
  let rand = Math.floor((Math.random() * 4) + 1);
  let md5name = Crypto.createHash('md5').update(filename).digest('hex');
  return 'http://vignette'+rand+'.wikia.nocookie.net/nekowiz/images/'+md5name.charAt(0)+'/'+md5name.charAt(0)+md5name.charAt(1)+'/'+filename+'/revision/latest?path-prefix=zh';
}
function getACard(id, list) {
  let found = _.find(list, { 'id': id });
  if(typeof found.id == 'undefined') return {};
  let prop = (typeof found.prop2 != 'undefined') ? [found.prop, found.prop2] : [found.prop];
  return {
    id: found.id,
    prop: prop,
    breed: found.breed,
    costs: parseInt(found.cost),
    costa: 0,
    hps: parseInt(found.max_hp),
    hpa: [],
    atks: parseInt(found.max_atk),
    atka: [],
    cdf: 0,
    data: found,
    active: false,
    legend: false
  }
}
function getTeam(match, list) {
  let team = [];
  let teamIds = match.split('&');
  for (let i = teamIds.length - 1; i >= 0; i--) {
    team.unshift(getACard(teamIds[i], list));
  }
  return team;
}
function calcSenzai(team, tar) {
  let hpa = [], atka = [], costa = 0, cdf = 0;
  for (var i = team.length - 1; i >= 0; i--) {
    let sz = team[i].data.senzaiArr;
    let hp = 0, atk = 0;
    for (var j = sz.length - 1; j >= 0; j--) {
      let szData = CardCollecStore.getSenzaiByName(sz[j]);
      switch(szData.type){
        case '攻擊力上升':
          if(szData.name[0] == '複') {
            if(team[tar].prop[0] == szData.elmts[0]) {
              if(team[tar].prop[1] == szData.elmts[1])
                atk += parseInt(szData.const2);
              else
                atk += parseInt(szData.const1);
            }
          } else if(typeof szData.elmts != 'undefined') {
            if(szData.elmts.indexOf(team[tar].prop[0]) != -1)
              atk += parseInt(szData.const);
          } else if(typeof szData.breed != 'undefined' || typeof szData.breed1 != 'undefined') {
            if(typeof szData.breed != 'undefined' && szData.breed == team[tar].breed) {
              atk += parseInt(szData.const);
            }else{
              if(typeof szData.breed1 != 'undefined' && szData.breed1 == team[tar].breed)
                atk += parseInt(szData.const);
              if(typeof szData.breed2 != 'undefined' && szData.breed2 == team[tar].breed)
                atk += parseInt(szData.const);
              if(typeof szData.breed3 != 'undefined' && szData.breed3 == team[tar].breed)
                atk += parseInt(szData.const);
            }
          } else {
            if(tar == i)
              atk += parseInt(szData.const);
          }
          break;
        case 'HP上升':
          if(szData.name[0] == '複') {
            if(team[tar].prop[0] == szData.elmts[0]) {
              if(team[tar].prop[1] == szData.elmts[1])
                hp += parseInt(szData.const2);
              else
                hp += parseInt(szData.const1);
            }
          } else if(typeof szData.elmts != 'undefined') {
            if(szData.elmts.indexOf(team[tar].prop[0]) != -1)
              hp += parseInt(szData.const);
          } else if(typeof szData.breed != 'undefined' || typeof szData.breed1 != 'undefined') {
            if(typeof szData.breed != 'undefined' && szData.breed == team[tar].breed) {
              hp += parseInt(szData.const);
            }else{
              if(typeof szData.breed1 != 'undefined' && szData.breed1 == team[tar].breed)
                hp += parseInt(szData.const);
              if(typeof szData.breed2 != 'undefined' && szData.breed2 == team[tar].breed)
                hp += parseInt(szData.const);
              if(typeof szData.breed3 != 'undefined' && szData.breed3 == team[tar].breed)
                hp += parseInt(szData.const);
            }
          } else {
            if(tar == i)
              hp += parseInt(szData.const);
          }
          break;
        case '減少COST':
          if(tar == i)
            costa -= parseInt(szData.const);
          break;
        case '快速技能':
          if(tar == i)
            cdf += parseInt(szData.const);
          break;
      }
    }
    hpa.unshift(hp);
    atka.unshift(atk);
  }
  return [hpa, atka, costa, cdf];
}

function generateASIcon(asStr, as2Str) {
  let res = as2Str.split('・').map(function(o){
    return cssTag.ASTAG[o];
  });
  if(asStr !== as2Str) res[1] = 'as2Only ' + res[1];
  return res.map(function(o){
    return <div className={o} />}
  );
}

class TeamCollec extends React.Component {
  constructor(props) {
    super(props);
    let list = CardCollecStore.getCardSourceList();
    let params = props.match.params;
    if(list == 0) {
      this.state = {
        params: params,
        team: [],
        helper: -1,
        cnt: 0
      }
      return;
    }
    let team = [];
    let helper = -1;
    let cnt = 0;
    if(typeof props.match.params.teamList != 'undefined'){
      team = getTeam(props.match.params.teamList, list);
      cnt += team.length;
    }
    if(typeof props.match.params.teamHelper != 'undefined'){
      helper = team.length;
      team.push(getACard(props.match.params.teamHelper, list));
      cnt += 1;
    }
    for (var i = team.length - 1; i >= 0; i--) {
      let assist = calcSenzai(team, i);
      team[i].hpa = assist[0];
      team[i].atka = assist[1];
      team[i].costa = assist[2];
      team[i].cdf = assist[3];
    }
    this.state = {
      params: params,
      team: team,
      helper: helper,
      cnt: cnt
    };
  }
  componentDidMount() {
    CardCollecStore.addChangeListener(this.changeHandler.bind(this));
  }
  componentWillUnmount() {
    CardCollecStore.removeChangeListener(this.changeHandler.bind(this));
  }
  changeHandler() {
    let list = CardCollecStore.getCardSourceList();
    let team = [];
    let helper = {};
    let cnt = 0;
    if(typeof this.state.params.teamList != 'undefined'){
      team = getTeam(this.state.params.teamList, list);
      cnt += team.length;
    }
    if(typeof this.state.params.teamHelper != 'undefined'){
      helper = team.length;
      team.push(getACard(this.state.params.teamHelper, list));
      cnt += 1;
    }
    for (var i = team.length - 1; i >= 0; i--) {
      let assist = calcSenzai(team, i);
      team[i].hpa = assist[0];
      team[i].atka = assist[1];
      team[i].costa = assist[2];
      team[i].cdf = assist[3];
    }
    this.setState({
      team: team,
      helper: helper,
      cnt: cnt
    });
  }
  activeEvent(i) {
    let team = this.state.team;
    team[i].active = !team[i].active;
    this.setState({
      team: team
    });
  }
  legendEvent(i) {
    let team = this.state.team;
    if(team[i].data.rank.indexOf('L') === -1) return;
    team[i].legend = !team[i].legend;
    this.setState({
      team: team
    });
  }
  backToEditor(e) {
    // Be aware, this team variable is for editor
    let team = CardCollecStore.getTeam();
    team.team = [];
    if(typeof this.state.params.teamList != 'undefined'){
      let teamIds = this.state.params.teamList.split('&');
      for (let i = teamIds.length - 1; i >= 0; i--) {
        team.team.unshift(teamIds[i]);
      }
      team.cnt = team.team.length;
    }
    if(typeof this.state.params.teamHelper != 'undefined'){
      team.helper = team.team.length;
      team.team.push(this.state.params.teamHelper);
      team.cnt += 1;
    }
    team.selected = _.uniq(team.team);
    CardCollecAction.updateTeam(team);
    this.props.history.push('/teamForm');
  }
  render() {
    let teamCollec = this;
    function teamItem(data, index){
      let small_filename = tw_filenameFix(data.data.small_filename) || "0000.png";
      let hp = data.hps + data.hpa.reduce((a, b) => a + b, 0);
      let atk = data.atks + data.atka.reduce((a, b) => a + b, 0);
      let cost = data.costs + data.costa;
      let ssTurn = parseInt(data.data.ssData.turn);
      let ss2Turn = data.data.ss2Data ? parseInt(data.data.ss2Data.turn) : null;
      let activeClass = 'pure-u-1 ' + (data.active? 'teamCardDetail toggle' : 'teamCardDetail');
      return (<div className={'cardItem teamItem pure-g'} key={'team-'+index+'-base'}>
        <div className={'pure-u-1-3'} key={'team-'+index+'-baseFrame'}>
          <div className={'pure-g'} key={'team-'+index+'-baseData'}>
            <div className={'pure-u-1 pure-u-md-1-2 imgFrame'} key={'team-'+index+'-imgFrame'}>
              {index === 0 &&
                <span className={'teamCardBadge'}>隊長</span>
              }
              {index === teamCollec.state.helper &&
                <span className={'teamCardBadge'}>援助</span>
              }
              <img key={'team-'+index+'-img'} src={linkGenerator(small_filename)} onClick={ (e) => {teamCollec.activeEvent(index)}}/>
            </div>
            <div className={'pure-u-1 pure-u-md-1-2'} key={'team-'+index+'-numberFrame'}>
              <div className={'pure-g numberData'} key={'team-'+index+'-numberData'}>
                <p className={'pure-u-1'} key={'team-'+index+'-hp'}>{hp}</p>
                <p className={'pure-u-1'} key={'team-'+index+'-atk'}>{atk}</p>
                <p className={'pure-u-1'} key={'team-'+index+'-cost'}>{cost}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={'pure-u-2-3'} key={'team-'+index+'-cdFrame'}>
          <div className={'pure-g'} key={'team-'+index+'-cdData'}>
            <div className={'pure-u-1-2'}>
              <div className={'teamAS'}>{generateASIcon(data.data.asData.type, data.data.as2Data.type)}</div>
            </div>
            <div className={'pure-u-1-2'}>
              <div className={'pure-g'}>
                <div className={'pure-u-1  pure-u-md-1-2'}>
                  {ssTurn}(首回{ssTurn > data.cdf ? (ssTurn - data.cdf) : 0})
                  <br />
                  {ss2Turn}(首回{ss2Turn > data.cdf ? (ss2Turn - data.cdf) : 0})
                </div>
                <div className={'pure-u-1  pure-u-md-1-2 pure-hidden-xs pure-hidden-sm'}>
                </div>
              </div>
            </div>
          </div>
          <div className={'senzaiList'} key={'team-'+index+'-senzaiArr'}>
            {data.data.senzaiArr.map(function(senzaiName, i){
              let senzai = CardCollecStore.getSenzaiByName(senzaiName);
              return <img src={linkGenerator(senzai.filename)} key={'team-'+index+'-senzai-'+i} />;
            })}
          </div>
        </div>
        <div className={activeClass}>
          <div className={'pure-g'}>
            <div className={'pure-u-1 pure-u-md-1-3 pure-button-group'} role={'group'} key={'team-'+index+'legendBtnCont'}>
              {data.data.rank.indexOf('L') !== -1 &&
                <button className={'button-warning button-small pure-button'} onClick={ (e) => {teamCollec.legendEvent(index)}}>{!data.legend? '進入傳奇模式' : '回到一般模式'}</button>
              }
              <Link to={'/card/'+data.id} className={'button-success button-small pure-button'}>詳細資料</Link>
            </div>
            <p className={'pure-u-1 pure-u-md-2-3'}>No. {data.data.id} - {data.data.name}</p>
            <div className={'pure-u-1'} key={'team-'+index+'skillFrame'}>
              <div className={'pure-g'} key={'team-'+index+'skillData'}>
                <div className={'pure-u-1 pure-u-md-1-2'} key={'team-'+index+'skillAS'}>
                  <div className={'pure-g'} key={'team-'+index+'-skillASData'}>
                    {!data.legend &&
                      <p className={'pure-u-1'} key={'team-'+index+'skillAS1'}> 答題技能: {data.data.asData.info}</p>
                    }
                    {data.legend &&
                      <p className={'pure-u-1'} key={'team-'+index+'skillAS2'}>答題技能2: {data.data.as2Data.info}</p>
                    }
                  </div>
                </div>
                <div className={'pure-u-1 pure-u-md-1-2'} key={'team-'+index+'skillSS'}>
                  <div className={'pure-g'} key={'team-'+index+'-skillSSData'}>
                    {!data.legend &&
                      <p className={'pure-u-1'} key={'team-'+index+'skillSS1'}> 特殊技能: {data.data.ssData.info} {ssTurn}({ssTurn > data.cdf ? (ssTurn - data.cdf) : 0})</p>
                    }
                    {data.legend &&
                      <p className={'pure-u-1'} key={'team-'+index+'skillSS2'}>特殊技能2: {data.data.ss2Data.info} {ss2Turn}({ss2Turn > data.cdf ? (ss2Turn - data.cdf) : 0})</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (
      <div>
        <h2 className={'content-subhead'}>隊伍詳細資料使用說明</h2>
        <p>
          如果你是使用合法網址的話，這裡會顯示此隊伍的資料。<br />
          本頁面會演算出隊伍在非L狀態且無瑪娜、結晶的三圍數值，你可以點擊卡片頭像查看卡片較詳細資料。<br />
          下方按鈕可以協助你到達本網站的其他功能。
        </p>
        {this.state.team.map(teamItem)}
        <div className={'pure-button-group'}>
          <Link to={'/'} className={'pure-button button-primary'}>←返回搜尋頁面</Link>
          <button className={'pure-button button-secondary'} onClick={this.backToEditor.bind(this)}>←返回編輯頁面</button>
        </div>
      </div>
    );
  }
}

export default withRouter(TeamCollec);