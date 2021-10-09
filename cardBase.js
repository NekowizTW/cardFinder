// module
import { URL, URLSearchParams } from 'url';
import fs from 'fs';

import _ from 'lodash';
import fetch from 'node-fetch';
import { Listr } from 'listr2';


import skill_parser from './data_scripts/skillparser/cardBase_skillParser.js';
import skill_mapper from './data_scripts/skillmapper.js';

const urlBase = 'https://nekowiz.fandom.com/zh/api.php';
const queryParamsGap = {
    format: 'json',
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    generator: 'allpages',
    gaplimit: '50'
};
const queryParamsP = {
    format: 'json',
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main'
};

function writeJSON (filename, source) {
  fs.writeFile(`./json/${filename}.json`, JSON.stringify(source), err => {
    if (err) log.error(`Failed to write ${filename}.json: ${err}`);
  });
}

async function querySourceCardPages (gapcontinue, rawPages, task) {
  // setting up params
  gapcontinue = gapcontinue || '';
  const params = Object.assign({
    'gapprefix': 'Card/Data/',
    'gapnamespace': '10',
    'gapfrom': gapcontinue
  }, queryParamsGap);

  // add param as url search, get data by fetch
  let url = new URL(urlBase);
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const data = await response.json();
  rawPages.push(data);
  task.output = `Fetched ${rawPages.length} requests.`;

  // check if we need another query or not
  if (data['continue'] === undefined) return rawPages;
  else return querySourceCardPages(data['continue'].gapcontinue, rawPages, task);
}

async function querySourceSkillPage (type) {
  // setting up params
  const params = Object.assign({
    'titles': type === 'Senzai' ? `模板:Senzai/Data` : `模板:Skill/${type}/Data`,
  }, queryParamsP);

  // add param as url search, get data by fetch
  let url = new URL(urlBase);
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function querySourceHandbookPages (gapcontinue, rawPages, task) {
  // setting up params
  gapcontinue = gapcontinue || '0';
  const params = Object.assign({
    'gapprefix': '精靈圖鑑',
    'gapnamespace': '0',
    'gapfrom': gapcontinue
  }, queryParamsGap);

  // add param as url search, get data by fetch
  let url = new URL(urlBase);
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const data = await response.json();
  rawPages.push(data);
  task.output = `Fetched ${rawPages.length} requests.`;

  // check if we need another query or not
  if (data['continue'] === undefined) return rawPages;
  else return querySourceHandbookPages(data['continue'].gapcontinue, rawPages, task);
}

// 50 pages/response
function queryCardsInPages (state, response) {
  const re = /\|(\w*)=(.*)/gmi;

  // locate page
  const keys = Object.keys(response.query.pages);
  keys.forEach(key => {
    // check card id is valid or not.
    const id = response.query.pages[key].title.split('模板:Card/Data/')[1];
    if(/^(Ex)?\d+(-\d+)?$/.test(id) == false) return;

    // prepare essential variables for matching
    const content = response.query.pages[key].revisions[0].slots.main['*'];
    const lines = content.split('\n');
    let card = {}, m;
    card.id = id;

    // exception: first line is not source card data format
    if (lines[0] !== '{{ Card/Data/{{{data}}}') return;
    // use predefined regular expression to scan attributes
    for (const idx in lines) {
      while ((m = re.exec(lines[idx])) !== null) {
        // console.log(`card attribute matching: ${m[1]}, ${m[2]}`);
        card[m[1]] = m[2].trim();
      }
    }

    // push exCard to another category
    if (id.indexOf('Ex') !== -1) {
      card.id = card.id.replace('Ex', '');
      state.exCards.push(card);
    } else state.cards.push(card);
    state.task.output = `Parsed ${state.cards.length + state.exCards.length} cards.`
  });
  return state;
}

// 1 page/response
function querySkillsInPage (response, type, task) {
  const re = /\|(\w*)=(.*)/gmi
  const re_h = /\|(.*)=\{\{/gmi;
  let skills = [];

  // prepare essential variables for matching
  const key = Object.keys(response.query.pages)[0];
  const content = response.query.pages[key].revisions[0].slots.main['*'];
  const lines = content.split('\n');
  let skill = {}, m;      // data matching
  let inBracket = false;  // bracket jumping

  // parsing each line
  for (const idx in lines) {
    // type 1: When we are not in bracket, we found left bracket.
    // Action: Get skill name.
    if (!inBracket && lines[idx].indexOf('{{ #switch: {{{data}}}') !== -1) {
      inBracket = true;
      while ((m = re_h.exec(lines[idx])) !== null) {
        skill.name = m[1];
      }
    }
    // type 2: When we are in bracket, we found right bracket.
    // Action: Parse this skill with skill_parser.
    else if (inBracket && lines[idx].indexOf('}}') !== -1) {
      inBracket = false;
      skill.attrs = skill_parser.parse(type, skill.info);
      skills.push(skill);
      task.output = `Parsed ${skills.length} skills.`
      skill = {};
    }
    // type 3: When we are in bracket, we found some attributes.
    // Action: Parse attributes for this skill.
    else if (inBracket) {
      while ((m = re.exec(lines[idx])) !== null) {
        skill[m[1]] = m[2];
      }
    }
    // type 4: We are not in bracket.
    // Action: Do nothing.
    else continue;
  }

  return skills;
}

// 50 pages/response
function queryObtainType(state, response) {
  const re = /(Ex)?\d+/;
  // specialPageList has preceding setting, we should care ordering
  const specialPageList = [
    {re: /精靈圖鑑\/(-|(繁中))?\d+/, gachaType: -1}, // 精靈圖鑑區
    {re: /精靈圖鑑\/進化開放/,        gachaType: -1}, // 進化開放區
    {re: /精靈圖鑑\/尚無資料/,        gachaType: -1}, // 望無資料：資料部份缺失頁面
    {re: /精靈圖鑑\/以/,             gachaType: -1}, // 只紀錄清單
    {re: /精靈圖鑑\/友情轉蛋/,        gachaType: 0}, // 保留，用於區分其他轉蛋
    {re: /精靈圖鑑\/\S+轉蛋/,        gachaType: 2}, // 全頁都是轉蛋
    {re: /精靈圖鑑\/主題限定/,        gachaType: 2}, // 全頁都是轉蛋
    {re: /精靈圖鑑\/聖誕節/,         gachaType: 2} // 全頁都是轉蛋
  ];

  // locate page
  const keys = Object.keys(response.query.pages);
  keys.forEach(key => {
    // prepare essential variables for matching
    const title = response.query.pages[key].title;
    const content = response.query.pages[key].revisions[0].slots.main['*'];
    const lines = content.split('\n');

    // gachaType: detect seirei type
    // [-1]: pages can be ignored
    // [ 0]: pages has haifu only
    // [ 1]: pages has haifu and gacha, block seperated
    // [ 2]: pages has gacha only
    let gachaType = 0;

    // set gachaType. if this page can be ignored, ignore it.
    if (title.indexOf('精靈圖鑑') === -1) return;
    specialPageList.every(item => {
      if (item.re.test(title)) {
        gachaType = item.gachaType;
        return false;
      } else return true;
    });
    if (gachaType === -1) return;

    for (const idx in lines) {
      if (lines[idx].indexOf('Card/Data') >= 0) {
        const id = lines[idx].match(re);
        state.data.push({
          id: id[0],
          title: title.replace('精靈圖鑑/', ''),
          type: (gachaType >= 1 ? 'gacha' : 'haifu')
        });
      }

      // changing gachaType (first "if" is for auto folding)
      if(gachaType === 1 && lines[idx].indexOf('div') >= 0) gachaType = 0;
      if(gachaType === 0 && lines[idx].indexOf('轉蛋限定') >= 0) gachaType = 1;
      if(gachaType === 0 && lines[idx].indexOf('儲值') >= 0) gachaType = 1;
      if(gachaType === 0 && lines[idx].indexOf('圖鑑成就') >= 0) gachaType = 1;
    }
  });
  return state;
}

let data_deck = {};

const tasks = new Listr([
  {
    title: 'Fetching cards',
    task: async (ctx, task) => {
      data_deck.cards = await querySourceCardPages('', [], task)
        .then(pages => {
          let groups = pages.reduce(queryCardsInPages, { cards: [], exCards: [], task: task });
          // seperate cards and exCards
          let cards = groups.cards;
          data_deck.exCards = groups.exCards;
          // sorting by custom ascending
          cards = _.sortBy(cards, card => {
            let id = card.id;             // type: string
            if (id.indexOf('-') !== -1) {
              const tmp = id.split('-').map(n => parseInt(n));
              id = tmp[0] + tmp[1] / 100; // type: integer
            } else id = parseInt(id);     // type: integer

            return (id < 0 ? (900000 - id) : id);
          });
          return cards;
        });
    }
  },
  {
    title: 'Fetching Skills',
    task: () => {
      const typeOfSkills = ['Senzai', 'Answer', 'Special', 'Answer2', 'Special2', 'EXAS'];
      return new Listr(typeOfSkills.map(skillType => {
        return {
          title: `Fetching ${skillType}`,
          task: async (ctx, task) => {
            await querySourceSkillPage(skillType)
              .then(page => {
                data_deck.skills = querySkillsInPage(page, skillType, task);
              });
          }
        }
      }));
    }
  },
  {
    title: 'Fetching obtainType',
    task: async (ctx, task) => {
      data_deck.obtainType = await querySourceHandbookPages('', [], task)
        .then(pages => {
          let group = pages.reduce(queryObtainType, { data: [], task: task });
          let handbookItems = group.data;

          // mapping to cards
          handbookItems.forEach(handbookItem => {
            const idx = _.findIndex(data_deck.cards, { 'id': handbookItem.id });
            data_deck.cards[idx] = Object.assign({ ['obtainType']: handbookItem }, data_deck.cards[idx]);
          })
          return handbookItems;
        });
    }
  },
]);

tasks.run().catch(err => {
  console.error(err);
});