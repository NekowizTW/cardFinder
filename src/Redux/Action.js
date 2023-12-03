import Store from './Store'

// bind defined action

class Action {
  constructor (dispatcher) {
    this.dispatcher = dispatcher
  }
  dispatch (params) {
    this.dispatcher.dispatch(params)
  }
	initCardData (CardData) {
    this.dispatch({
      type: "InitCardData",
      payload: CardData
    })
  }
  filterChange (filter) {
    this.dispatch({
      type: "FilterChange",
      payload: filter
    })
  }
  setListing (listSettings) {
    this.dispatch({
      type: "ListingChange",
      payload: listSettings
    })
  }
  updateTeam (selectedTeam) {
    this.dispatch({
      type: "UpdateTeam",
      payload: selectedTeam
    })
  }
}

export default new Action(Store)
