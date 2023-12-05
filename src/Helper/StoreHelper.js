import Store from '../Redux/Store';

// card relative
const cardNotFoundTemplate = {
  id: '-1',
  prop: '無',
  prop2: '無',
  breed: '道具',
  rank: '',
  name: '無',
  max_hp: 0,
  max_atk: 0,
  cost: 0,
  small_filename: '0000.png',
  asData: {
    name: '無', info: '', type: '無', attrs: [[]],
  },
  ssData: {
    name: '無', info: '', type: '無', attrs: [[]],
  },
  as2Data: {
    name: '無', info: '', type: '無', attrs: [[]],
  },
  ss2Data: {
    name: '無', info: '', type: '無', attrs: [[]],
  },
  senzaiArr: [],
};

export function getCardById(id) {
  const targetCard = Store.getState().SourceCards.find((card) => card.id === id);
  return targetCard || cardNotFoundTemplate;
}

// Senzai Relative
const senzaiNotFoundTemplate = {
  name: '無',
  info: '',
  type: '無',
  filename: 'Senzai_NONE.png',
  attrs: [],
};

export function getSenzaiByName(name) {
  const targetSenzai = Store.getState().SourceSenzai.find((senzai) => senzai.name === name);
  return targetSenzai || senzaiNotFoundTemplate;
}

// exCard relative
const exCardNotFoundTemplate = { name: '無結晶', id: '', senzai_1: '' };

export function getEXCardById(id) {
  const targetEXCard = Store.getState().SourceEXCards.find((exCard) => exCard.id === id);
  return targetEXCard || exCardNotFoundTemplate;
}

// leaderEX relative
const leaderEXNotFoundTemplate = {
  name: '無結晶',
  rank: '',
  condition: '無',
  skill: '無',
  small_filename: '0000.png',
};
export function getLeaderEXByValue(value) {
  if (value.length === 0) return leaderEXNotFoundTemplate;

  const targetLeaderEXCard = Store.getState().SourceLeaderEXCards.find((leaderEXCard) => `${leaderEXCard.name}${leaderEXCard.rank}` === value);
  return targetLeaderEXCard || leaderEXNotFoundTemplate;
}
