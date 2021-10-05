// module
var _ = require('lodash');
var JSONP = require('node-jsonp');
var fs = require('fs');
var skill_parser = require('./data_scripts/skillparser/cardBase_skillParser.js')
var skill_mapper = require('./data_scripts/skillmapper.js')

var data_deck = {
  card: [],
  Answer: [],
  Special: [],
  Answer2: [],
  Special2: [],
  Senzai: [],
  EXAS: [],
  exCard: [],
  obtainType: []
};
var data_source = {
  card: [],
  Answer: {},
  Special: {},
  Answer2: {},
  Special2: {},
  EXAS: [],
  Senzai: {},
  obtainType: []
}
var urlBase = 'https://nekowiz.fandom.com/zh/api.php';
var queryParamsGap = {
    format: 'json',
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    generator: 'allpages',
    gaplimit: '50'
};
var queryParamsP = {
    format: 'json',
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    titles: ''
};
function writeJSON(filename, source){
  fs.writeFile('./json/'+filename+'.json', JSON.stringify(source), function(err){
    if(err){
      return console.log(err);
    }
  });
}
function querySourceC(start){
    start = start || '';
    var params = queryParamsGap;
    params.gapprefix = 'Card/Data/';
    params.gapnamespace = '10';
    if(start.length > 0) params.gapfrom = start;
    JSONP(urlBase, params, function(data){
      var last = '';
      if(typeof data['continue'] !== 'undefined') last = data['continue'].gapcontinue;
      data_source.card.push(data);
      if(data_source.card.length === data.length) console.log('Source progress: '+data_source.card.length);
      if(last.length <= 0) return sourceCHandler();
      else return querySourceC(last);
    });
}
function querySourceS(type){
    var params = queryParamsP;
    if(type === 'Senzai') params.titles = '模板:Senzai/Data';
    else params.titles = '模板:Skill/'+type+'/Data';
    JSONP(urlBase, params, function(data){
      data_source[type] = data;
      return sourceSHandler(type);
    });
}
function querySourceH(start){
    start = start || '';
    var params = queryParamsGap;
    params.gapprefix = '精靈圖鑑';
    params.gapnamespace = 0;
    if(start.length > 0) params.gapfrom = start;
    JSONP(urlBase, params, function(data){
      var last = '';
      if(typeof data['continue'] !== 'undefined') last = data['continue'].gapcontinue;
      data_source.obtainType.push(data);
      if(data_source.card.length === data.length) console.log('Handbook progress: '+data_source.card.length);
      if(last.length <= 0) return sourceHHandler();
      else return querySourceH(last);
    });
}
function queryCard(){
    var re = /\|(\w*)=(.*)/gmi;
    for(var ptr in data_source.card){
        for(var key in data_source.card[ptr].query.pages){
            if(key == -1) continue;
            var str = '', str_s, group = {}, m;
            var id = data_source.card[ptr].query.pages[key].title.split('模板:Card/Data/')[1];
            if(/^(Ex)?\d+(-\d+)?$/.test(id) == false) continue;
            group.id = id;
            str = data_source.card[ptr].query.pages[key].revisions[0]['slots']['main']['*'];
            str_s = str.split('\n');
            if(str_s[0] == '{{ Card/Data/{{{data}}}'){
              for(var key in str_s){
                while((m = re.exec(str_s[key]))!= null){
                  //console.log(m[1], m[2])
                  group[m[1]] = m[2].trim();
                }
              }
              // add obtainType by Handbook
              var obtainType = _.find(data_deck.obtainType, {id: group.id});
              if(obtainType !== undefined) group.obtainType = obtainType;
              if(id.indexOf('Ex') !== -1){
                group.id = group.id.replace('Ex', '');
                data_deck.exCard.push(group);
              }else data_deck.card.push(group);
            }
            group = {};
        };
    }
}
function querySkill(type){
    var re = /\|(\w*)=(.*)/gmi, re_h = /\|(.*)=\{\{/gmi;
    for(var key in data_source[type].query.pages){
      if(key == -1) continue;
      var str = '', str_s, group = {}, m;
      str = data_source[type].query.pages[key].revisions[0]['slots']['main']['*'];
      str_s = str.split('\n');
      var status = false, ptr = 0;
      for(var key in str_s){
        if(str_s[key].indexOf('{{ #switch: {{{data}}}') != -1 && !status){
          status = true;
          while((m = re_h.exec(str_s[key]))!= null){
            group['name'] = m[1];
          }
        }else if(str_s[key].indexOf('}}') != -1 && status){
          group['attrs'] = skill_parser.parse(type, group.info);
          status = false;
          ptr = 1;
          data_deck[type].push(group);
          group = {};
        }else if(status){
          while((m = re.exec(str_s[key]))!= null){
            group[m[1]] = m[2];
          }
        }else{
          continue;
        }
      }
    }
}
function queryObtainType(){
  var re = /(Ex)?\d+/;
  var specialPageList = [
    {re: /精靈圖鑑\/(-|(繁中))?\d+/, status: -1}, // 精靈圖鑑區
    {re: /精靈圖鑑\/進化開放/, status: -1}, // 進化開放區
    {re: /精靈圖鑑\/尚無資料/, status: -1}, // 望無資料：資料部份缺失頁面
    {re: /精靈圖鑑\/以/, status: -1}, // 只紀錄清單
    {re: /精靈圖鑑\/友情轉蛋/, status: 0}, // 保留，用於區分其他轉蛋
    {re: /精靈圖鑑\/\S+轉蛋/, status: 2}, // 全頁都是轉蛋
    {re: /精靈圖鑑\/主題限定/, status: 2} // 全頁都是轉蛋
  ];
  for(var ptr in data_source.obtainType){
    for(var key in data_source.obtainType[ptr].query.pages){
      if(key == -1) continue;
      var title = data_source.obtainType[ptr].query.pages[key].title;
      var str = data_source.obtainType[ptr].query.pages[key].revisions[0]['slots']['main']['*'];
      var status = 0;
      if(title.indexOf('精靈圖鑑') === -1) continue;
      // loop check the page is not in the ignoreTitleList

      specialPageList.every(function(item){
        if(item.re.test(title)) {
          status = item.status;
          return false;
        }else return true;
      })
      if(status === -1) continue;

      var str_s = str.split('\n');
      var rows = [];
      str_s.forEach(function(line){
        if(line.indexOf('Card/Data') >= 0){
          var id = line.match(re);
          rows.push({
            id: id[0],
            title: title.replace('精靈圖鑑/', ''),
            type: (status >= 1 ? 'gacha' : 'haifu')
          });
        }
        if(status !== 0 && line.indexOf('div') >= 0) status = 0;
        if(status === 0 && line.indexOf('轉蛋限定') >= 0) status = 1;
        if(status === 0 && line.indexOf('儲值') >= 0) status = 1;
        if(status === 0 && line.indexOf('圖鑑成就') >= 0) status = 1;
      });
      data_deck.obtainType = data_deck.obtainType.concat(rows);
    }
  }
}
function sourceCHandler(){
    queryCard();
    data_deck.card = _.sortBy(data_deck.card, function(card){
      var id;
      if(card.id.indexOf('-') !== -1){
        var tmp = card.id.split('-').map(function(n) { return parseInt(n); });
        id = tmp[0] + tmp[1] / 100;
      }else id = parseInt(card.id);
      if(id < 0) return (900000-id);
      else return id;
    });
    writeJSON('exCard', data_deck.exCard);
    writeJSON('cardData', skill_mapper(data_deck));
}
function sourceSHandler(type){
    querySkill(type);
    writeJSON(type+'Skill', data_deck[type]);
}
function sourceHHandler(){
  queryObtainType();
  writeJSON('obtainType', data_deck['obtainType']);
}

querySourceS('Senzai');
querySourceS('Answer');
querySourceS('Special');
querySourceS('Answer2');
querySourceS('Special2');
querySourceS('EXAS');
querySourceH();
querySourceC();
