import _ from 'lodash';

function dataExist (data) {
    return (typeof data !== 'undefined' && data.length != 0);
}
function cardDataParse (data) {
  const res = data;
  for (const index in res.cards) {
    let card = {
      evoArr: [],
      senzaiArr: [],
      senzaiLArr: [],
      asData: {},
      ssData: {},
      as2Data: {},
      ss2Data: {},
      EXASData: {}
    };

    // card evolution assets to Array
    for (const i = 1; i <= 8; i++) {
      if (dataExist(res.cards[index]['evo_'+i])) {
        card.evoArr.push(res.cards[index]['evo_'+i]);
      } else break;
    }
    // card senzai to Array
    for (const i = 1; i <= 10; i++) {
      if (dataExist(res.cards[index]['senzai_'+i])) {
        card.senzaiArr.push(res.cards[index]['senzai_'+i]);
      } else break;
    }
    // card senzai legend to Array
    for (const i = 1; i <= 4; i++) {
      if (dataExist(res.cards[index]['senzaiL_'+i])) {
        card.senzaiLArr.push(res.cards[index]['senzaiL_'+i]);
      } else break;
    }

    // Mapping AS
    if (dataExist(res.cards[index].as)) card.asData = _.find(res.Answer, {'name': res.cards[index].as}) || {'name': res.cards[index].as, 'info': '尚無技能資料'};
    else card.asData = res.Answer[0];
    // Mapping SS
    if(dataExist(res.cards[index].ss)) card.ssData = _.find(res.Special, {'name': res.cards[index].ss}) || {'name': res.cards[index].ss, 'info': '尚無技能資料'};
    else card.ssData = res.Special[0];
    // Mapping AS2
    if(dataExist(res.cards[index].as2)) card.as2Data = _.find(res.Answer2, {'name': res.cards[index].as2}) || {'name': res.cards[index].as2, 'info': '尚無技能資料'};
    else card.as2Data = res.Answer2[0];
    // Mapping SS2 and EXAS
    if(dataExist(res.cards[index].ss2)) {
      card.ss2Data = _.find(res.Special2, {'name': res.cards[index].ss2}) || {'name': res.cards[index].ss2, 'info': '尚無技能資料'};
      // exas detect
      card.EXASData = _.find(res.EXAS, {'name': res.cards[index].id}) || {};
    } else card.ss2Data = res.Special2[0];

    // decrease unnecessary EXAS column
    if(Object.keys(card.EXASData).length === 0) delete card.EXASData;
    Object.assign(res.cards[index], card);
  }

  return {
    card: res.cards,
    Senzai: res.Senzai
  };
}

export default cardDataParse;