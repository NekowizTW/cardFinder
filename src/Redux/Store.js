import { createStore } from "redux";

import Reducer from "./Reducer.js";

const Store = createStore(Reducer, {
  //Source card data, Should not be changed
  SourceCards: [],
  //Source Senzai data
  SourceSenzai: [],
  //Source ex card data
  SourceEXCards: [],
  //Source leader ex card data
  SourceLeaderEXCards: [],
  //Source card skill categories, should not change
  SourceFilterSettings: {},
  //Current list card data
  ListCards: [],
  //Current settings of how to show cards
  ListSettings: { paging: 10, sorting: 'id', ordering: 'desc', page: 0, maxPage: 0, totalCount: 0 },
  //Current card filter configurations
  ListFiltter: {},
  //Current selected and teamup cards
  TeamCards: {
    selected: [],
    leaderEX: '',
    team: [
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] },
      { id: -1, exas: false, szSlot: 10, mana: 0, ex: [] }
    ],
    helper: { id: -1, szSlot: 10, mana: 0, ex: [] }
  }
});

export default Store;
