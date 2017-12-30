import React    from 'react';
import TeamForm     from './TeamForm.react';
import { Container } from 'flux/utils';

import CardCollecStore  from '../../Store/CardCollecStore';

class TeamFormContainer extends React.Component {
  static getStores() {
    return [CardCollecStore];
  }

  static calculateState() {
    return { 
      //TeamForm.react.js
      team: CardCollecStore.getState().TeamCards
    };
  }

  render() {
    return (
      <div>
        <TeamForm team={this.state.team}/>
      </div>
    );
  }
}

const teamFormContainer = Container.create(TeamFormContainer);

export default teamFormContainer;