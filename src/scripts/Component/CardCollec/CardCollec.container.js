import React    from 'react';
import Form     from './Form.react';
import List	    from './List.react';
import { Container } from 'flux/utils';

import CardCollecStore  from '../../Store/CardCollecStore';
import CardCollecAction  from '../../Actions/CardCollecAction';

class CardCollec extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  static getStores() {
    return [CardCollecStore];
  }

  static calculateState() {
    return { 
      //Form.react.js
      filter: CardCollecStore.getState().ListFiltter,
      filterSettings: CardCollecStore.getState().SourceFilterSettings,
      //List.react.js
      list: CardCollecStore.getState().ListCards,
      settings: CardCollecStore.getState().ListSettings,
      team: CardCollecStore.getState().TeamCards
    };
  }

  render() {
    return (
      <div>
        <Form query={this.props.location.query} filter={this.state.filter} settings={this.state.filterSettings}/>
        <List list={this.state.list} settings={this.state.settings} team={this.state.team}/>
      </div>
    );
  }
}

const CardCollecContainer = Container.create(CardCollec);

export default CardCollecContainer;