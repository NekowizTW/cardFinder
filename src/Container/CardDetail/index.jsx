import React from 'react'

import Store  from '../../Redux/Store'

import { getCardById } from '../../Helper/StoreHelper'

import Card from './Card'

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