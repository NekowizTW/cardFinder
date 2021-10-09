import { createStore } from "redux";

import Reducer from "./Reducer.js";

const Store = createStore(Reducer, {
  //Source card data, Should not be changed
  SourceCards: [],
  //Source Senzai data
  SourceSenzai: [],
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
    team: [],
    helper: -1,
    cnt: 0
  }
});

export default Store;
