import React    from 'react';
import ReactDOM from 'react-dom';
import Crypto   from 'crypto';
import { Link } from 'react-router-dom';

import CardCollecAction from '../Actions/CardCollecAction';
import CardCollecStore  from '../Store/CardCollecStore';

function tw_filenameFix(filename) {
  return String(filename).charAt(0).toUpperCase() + String(filename).slice(1);
}
function linkGenerator(filename) {
  let rand = Math.floor((Math.random() * 4) + 1);
  let md5name = Crypto.createHash('md5').update(filename).digest('hex');
  return 'http://vignette'+rand+'.wikia.nocookie.net/nekowiz/images/'+md5name.charAt(0)+'/'+md5name.charAt(0)+md5name.charAt(1)+'/'+filename+'/revision/latest?path-prefix=zh';
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    let team = CardCollecStore.getTeam();
    this.state = {
      team: team
    }
  }
  componentDidMount() {
    CardCollecStore.addChangeListener(this.changeHandler.bind(this));
  }
  componentWillUnmount() {
    CardCollecStore.removeChangeListener(this.changeHandler.bind(this));
  }
  changeHandler() {
    let team = CardCollecStore.getTeam();
    this.setState({ team: team });
  }
  toggleSelect(id) {
    let team = this.state.team;
    if(id === 0){
      team.selected = [];
    }else{
      let idx = team.selected.indexOf(id);
      if(idx > -1)
        team.selected.splice(idx, 1);
      else{
        team.selected.push(id);
      }
    }
    this.setState({team: team}, () => {
      CardCollecAction.updateTeam(team);
    });
  }
  render() {
    let cards = this.props.CardData;
    let cardHandler = this;
    function cardItem(data){
      let small_filename = tw_filenameFix(data.small_filename) || "0000.png";
      let senzaiElements = [];
      let hover = cardHandler.state.team.selected.indexOf(data.id) > -1 ? 'selected' : '';
      return (<div className={'cardItem pure-g ' + hover} key={'card-'+data.id+'-base'}>
        <div className={'pure-u-1-6 imgFrame'} key={'card-'+data.id+'-imgFrame'}>
          <img key={'card-'+data.id+'-img'} src={linkGenerator(small_filename)} onClick={() => cardHandler.toggleSelect(data.id)}/>
        </div>
        <div className={'pure-u-2-3'} key={'card-'+data.id+'-nameFrame'}>
          <Link to={'/card/'+data.id} key={'card-'+data.id+'-name'}>No. {data.id} - {data.name}</Link>
          <div className={'pure-g'} key={'card-'+data.id+'-hpatk'}>
            <p className={'pure-u-1-2'} key={'card-'+data.id+'-hp'}>HP: {data.max_hp}</p>
            <p className={'pure-u-1-2'} key={'card-'+data.id+'-atk'}>ATK: {data.max_atk}</p>
          </div>
          <div className={'senzaiList'} key={'card-'+data.id+'-senzaiArr'}>
            {data.senzaiArr.map(function(senzaiName, i){
              let senzai = CardCollecStore.getSenzaiByName(senzaiName);
              return <img src={linkGenerator(senzai.filename)} key={'card-'+data.id+'-senzai-'+i} />;
            })}
          </div>
        </div>
        <div className={'pure-u-1-6'} key={'card-'+data.id+'-other'}>
          {data.breed}<br/>
          Cost {data.cost}<br/>
          進化 {data.evo_now+'/'+data.evo_max}
        </div>
      </div>);
    }
    function selectedNotify() {
      let len = cardHandler.state.team.selected.length;
      if (len == 0)
        return (<div>
          <p className={'pure-u-1'}>
            點擊卡片縮圖可以選取卡片，選取的卡片可以作為其他用途
          </p>
        </div>);
      else
        return (<div className={'cardItem pure-g'}>
          <p className={'pure-u-1'}>
            你已經選擇了 {len} 張卡片，可以使用以下功能
          </p>
          <div className={'pure-u-1'}>
            <Link to={'/teamform'} className={'pure-button'}>卡片組隊</Link>
            <button className={'pure-button button-error'} onClick={(e) => {cardHandler.toggleSelect(0)}}>
              清除選擇
            </button>
          </div>
        </div>);
    }
    return (<div>
      {selectedNotify()}
      {cards.map(cardItem)}
    </div>);
  }
}

export default Card;
