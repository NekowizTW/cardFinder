import CardCollecDispatcher from '../Dispatcher/CardCollecDispatcher';

// bind defined action

class CardCollecAction {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  dispatch(params) {
    this.dispatcher.dispatch(params);
  }
	initCardData(CardData) {
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
  setListing(listSettings) {
    this.dispatch({
      actionType: "ListingChange",
      data: listSettings
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
