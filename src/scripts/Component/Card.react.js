import React    from 'react';
import ReactDOM from 'react-dom';
import Crypto   from 'crypto';
import { Link } from 'react-router-dom';

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
  }
  render() {
    let cards = this.props.CardData;
    function cardItem(data){
      let small_filename = tw_filenameFix(data.small_filename) || "0000.png";
      let senzaiElements = [];
      return (<div className={'cardItem pure-g'} key={'card-'+data.id+'-base'}>
        <div className={'pure-u-1-6 imgFrame'} key={'card-'+data.id+'-imgFrame'}>
          <img key={'card-'+data.id+'-img'} src={linkGenerator(small_filename)} />
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
    return (<div>
      {cards.map(cardItem)}
    </div>);
  }
}

export default Card;
