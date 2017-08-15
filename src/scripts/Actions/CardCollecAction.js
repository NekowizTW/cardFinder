import CardCollecDispatcher from '../Dispatcher/CardCollecDispatcher';

// bind defined action

class CardCollecAction {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  dispatch(params) {
    this.dispatcher.dispatch(params);
  }
  parseSenzaiList(SenzaiData) {
    this.dispatch({
      actionType: "InitSenzaiData",
      data: SenzaiData
    });
  }
	parseCardList(CardData) {
    this.dispatch({
      actionType: "InitCardData",
      data: CardData
    });
  }
  filterChange(filter) {
    this.dispatch({
      actionType: "FilterChange",
      data: filter
    });
  }
  setListing(list) {
    this.dispatch({
      actionType: "SetListing",
      data: list
    });
  }
  updateTeam(selectedTeam) {
    this.dispatch({
      actionType: "UpdateTeam",
      data: selectedTeam
    });
  }
}

export default new CardCollecAction(CardCollecDispatcher);
