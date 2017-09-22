// module
import _        from 'lodash';
import jsonp    from 'jsonp-es6';
import Console  from 'console-browserify';

const cardBase = {
  init(callback) {
    this.querySourceS('Senzai');
    this.callback = () => {
      callback();
    };
  },
  callback() {},
  urlBase: 'http://zh.nekowiz.wikia.com/api.php',
  urlSnapshot: '',
  data_deck: {
    card: [],
    Answer: [],
    Special: [],
    Answer2: [],
    Special2: [],
    Senzai: []
  },
  data_source: {
    card: [],
    Answer: {},
    Special: {},
    Answer2: {},
    Special2: {},
    Senzai: {}
  },
  queryParamsGap: {
    format: 'json',
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    generator: 'allpages',
    gapprefix: 'Card/Data/',
    gapnamespace: '10',
    gaplimit: '50'
  },
  queryParamsP: {
    format: 'json',
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    titles: ''
  },
  querySourceC(start='') {
      const params = this.queryParamsGap;
      params.gapprefix = 'Card/Data/';
      if(start.length > 0) params.gapfrom = start;
      jsonp(this.urlBase, params).then((data) => {
        let last = '';
        if(typeof data['query-continue'] !== 'undefined') last = data['query-continue'].allpages.gapfrom;
        this.data_source.card.push(data);
        console.log(`Source progress: ${this.data_source.card.length}`);
        if(last.length <= 0) return this.sourceCHandler();
        else this.querySourceC(last);
      });
  },
  querySourceS(type) {
      let params = this.queryParamsP;
      if(type === 'Senzai') params.titles = '模板:Senzai/Data';
      else params.titles = '模板:Skill/'+type+'/Data';
      jsonp(this.urlBase, params).then((data) => {
        this.data_source[type] = data;
        return this.sourceSHandler(type);
      });
  },
  queryCard() {
      let str = '', str_s, group = {}, m;
      const re = /\|(\w*)=(.*)/gmi;
      for(const ptr in this.data_source.card){
          for(let key in this.data_source.card[ptr].query.pages){
              if(key == -1) continue;
              const id = this.data_source.card[ptr].query.pages[key].title.split('模板:Card/Data/')[1];
              if(/^(Ex)?\d+(-\d+)?$/.test(id) == false) continue;
              group.id = id;
              str = this.data_source.card[ptr].query.pages[key].revisions[0]['*'];
              str_s = str.split('\n');
              if(str_s[0] == '{{ Card/Data/{{{data}}}'){
                for(let key in str_s){
                  while((m = re.exec(str_s[key]))!= null){
                    group[m[1]] = m[2];
                  }
                }
                if(id.indexOf('Ex') !== -1){
                  group.id = group.id.replace('Ex');
                  data_deck.exCard.push(group);
                }else data_deck.card.push(group);
              }
              group = {};
          };
      }
  },
  querySkill(type){
      let str = '', str_s, group = {}, m;
      let re = /\|(\w*)=(.*)/gmi, re_h = /\|(\S*)=\{\{/gmi;
      for(let key in this.data_source[type].query.pages){
        if(key == -1) continue;
        str = this.data_source[type].query.pages[key].revisions[0]['*'];
        str_s = str.split('\n');
        let status = false, ptr = 0;
        for(let key in str_s){
          if(str_s[key].indexOf('{{ #switch: {{{data}}}') != -1 && !status){
            status = true;
            while((m = re_h.exec(str_s[key]))!= null){
              group['name'] = m[1];
            }
          }else if(str_s[key].indexOf('}}') != -1 && status){
            status = false;
            ptr = 1;
            this.data_deck[type].push(group);
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
  },
  sourceCHandler(source) {
    source = source || '';
    if(source != 'snapshot') this.queryCard();
    this.data_deck.card = _.sortBy(this.data_deck.card, card => {
      let id;
      if(card.id.indexOf('-') !== -1){
        var tmp = card.id.split('-').map(function(n) { return parseInt(n); });
        id = tmp[0] + tmp[1] / 100;
      }else id = parseInt(card.id);
      if(id < 0) return (900000-id);
      else return id;
    });
    this.callback();
  },
  sourceSHandler(type){
    this.querySkill(type);
    switch(type){
      case 'Senzai':
        this.querySourceS('Answer');
        break;
      case 'Answer':
        this.querySourceS('Special');
        break;
      case 'Special':
        this.querySourceS('Answer2');
        break;
      case 'Answer2':
        this.querySourceS('Special2');
        break;
      case 'Special2':
        this.querySourceC();
        break;
    }
  }
};

export default cardBase;