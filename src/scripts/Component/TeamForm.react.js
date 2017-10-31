import React    from 'react';
import ReactDOM from 'react-dom';
import _        from 'lodash';
import Crypto   from 'crypto';
import { Link } from 'react-router-dom';
import Console  from 'console-browserify';

import CardCollecAction from '../Actions/CardCollecAction';
import CardCollecStore  from '../Store/CardCollecStore';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function replaceLast(x, y, z){
  // Ref: https://stackoverflow.com/a/41899895
  var a = x.split("");
  a[x.lastIndexOf(y)] = z;
  return a.join("");
}
function tw_filenameFix(filename) {
  return String(filename).charAt(0).toUpperCase() + String(filename).slice(1);
}
function linkGenerator(filename) {
  let rand = Math.floor((Math.random() * 4) + 1);
  let md5name = Crypto.createHash('md5').update(filename).digest('hex');
  return 'https://vignette'+rand+'.wikia.nocookie.net/nekowiz/images/'+md5name.charAt(0)+'/'+md5name.charAt(0)+md5name.charAt(1)+'/'+filename+'/revision/latest?path-prefix=zh';
}
function getACard(id, list) {
  Console.log(id);
  let found = _.find(list, { 'id': id });
  if(typeof found.id == 'undefined') return {};
  let prop = (typeof found.prop2 != 'undefined') ? [found.prop, found.prop2] : [found.prop];
  return {
    id: found.id,
    data: found
  }
}

class TeamForm extends React.Component {
  constructor(props) {
    super(props);
    let list = CardCollecStore.getCardSourceList();
    let team = CardCollecStore.getTeam();
    let help = (team.helper !== -1);
    if(list == 0) {
      this.state = {
        list: [],
        team: team,
        help: help
      }
      return;
    }
    this.state = {
      list: list,
      team: team,
      help: help
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
    let team = CardCollecStore.getTeam();
    if(this.state.list.length === 0)
      this.setState({list: list});
    else
      this.setState({team: team});
  }
  pushMember(id) {
    let team = CardCollecStore.getTeam();
    let help = this.state.help;
    if(team.cnt === 6) return;
    team.team.push(id);
    team.cnt = team.team.length;
    help = (team.cnt === 6 || (team.cnt > 2 && help));
    team.helper = help? (team.cnt - 1) : -1;
    this.setState({team: team, help: help}, function(){
      CardCollecAction.updateTeam(team);
    });
  }
  deleteByIdx(idx) {
    let team = CardCollecStore.getTeam();
    let help = this.state.help;
    team.team.splice(idx, 1);
    team.cnt = team.team.length;
    help = (team.cnt === 6 || (team.cnt > 2 && help));
    team.helper = help? (team.cnt - 1) : -1;
    this.setState({team: team, help: help}, function(){
      CardCollecAction.updateTeam(team);
    });
  }
  toggleHelper(e) {
    let team = CardCollecStore.getTeam();
    let help = e.target.checked;
    team.cnt = team.team.length;
    help = (team.cnt === 6 || (team.cnt > 2 && help));
    team.helper = help? (team.cnt - 1) : -1;
    this.setState({team: team, help: help}, function(){
      CardCollecAction.updateTeam(team);
    });
  }
  render() {
    let teamForm = this;
    let url = this.state.team.team.join('&');
    if(this.state.help)
      url = replaceLast(url, '&', '/');
    return (
      <div>
        <h2 className={'content-subhead'}>隊伍編輯使用說明</h2>
        <p>
          本頁面請不要直連或重新整理，你可以配合隊伍搜尋器邊選擇卡片邊組隊。<br />
          本頁面不會運算出隊伍三圍，請組好後點擊匯出看結果。<br />
          點擊候選清單內的卡片可以新增一張卡片到隊伍內容的最後一張，點擊隊伍內容的卡片可以移除該卡片。<br />
          隊伍內容第一張選擇必為隊長，勾選援助者可以將隊伍最後一張設定成援助者。
        </p>
        <div className={'pure-form pure-form-stacked'}>
          <legend>編輯隊伍</legend>
          <label for="helpTag" class="pure-checkbox">
              <input id="helpTag" type="checkbox" checked={this.state.help} onClick={this.toggleHelper.bind(this)} />
              此陣容已包含援助者
          </label>
          <fieldset className={'pure-group'}>
            <label>隊伍內容</label>
            <div className={'pure-g'}>
              {this.state.team.team.map(function(id, index){
                let card = getACard(id, teamForm.state.list);
                let small_filename = tw_filenameFix(card.data.small_filename) || "0000.png";
                return(<div className={'cardItem teamItem pure-u-1 pure-u-md-1-6'} key={'team-'+index+'-base'}>
                  <div className={'imgFrame'} key={'teamForm-'+index+'-imgFrame'}>
                    {index === 0 &&
                      <span className={'teamCardBadge'}>隊長</span>
                    }
                    {index === teamForm.state.team.helper &&
                      <span className={'teamCardBadge'}>援助</span>
                    }
                    <img key={'teamForm-'+index+'-img'} src={linkGenerator(small_filename)} onClick={() => teamForm.deleteByIdx(index)}/>
                  </div>
                </div>);
              })}
            </div>
          </fieldset>
          <fieldset className={'pure-group'}>
            <label>候選清單</label>
            <div className={'pure-g'}>
              {this.state.team.selected.map(function(id, index){
                let card = getACard(id, teamForm.state.list);
                let small_filename = tw_filenameFix(card.data.small_filename) || "0000.png";
                return (<div className={'cardItem teamItem pure-u-1-2 pure-u-md-1-6'} key={'team-'+index+'-base'}>
                  <div className={'imgFrame'} key={'team-'+index+'-imgFrame'}>
                    <img key={'teamSelected-'+index+'-img'} src={linkGenerator(small_filename)} onClick={() => teamForm.pushMember(id)}/>
                  </div>
                </div>);
              })}
            </div>
          </fieldset>
          <fieldset className={'pure-group'}>
            <Link to={'/'} className={'pure-button button-primary'}>←返回搜尋頁面</Link>
            <Link to={'/team/' + url} className={'pure-button button-success'}>匯出隊伍結果→</Link>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default TeamForm;