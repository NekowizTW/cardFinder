import React from 'react'

import Store  from '../Redux/Store.js'
import Action from '../Redux/Action.js'

import { getCardById } from '../Helper/StoreHelper.js'

import Card from './CardDetail/Card.react.js'

class CardDetail extends React.Component {
  constructor (props) {
    super(props)
    const unsubscribe = Store.subscribe(() => {})
    this.state = {
      unsubscribe: unsubscribe
    }
  }

  static getDerivedStateFromProps (props, state) {
    const cardId = props.match.params.cardId || '0'
    const card   = getCardById(cardId)
    return {
      cardId: cardId,
      card: card
    }
  }

  render () {
    return <div>
      <Card cardId={this.state.cardId} data={this.state.card} />
    </div>
  }
}

export default CardDetail