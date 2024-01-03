import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initCards } from '../actions/cardsActions';
import { cardNotFoundTemplate } from '../model/NotFoundTemplates';
import { FETCH_STATUS } from '../model/variables';

export default function useGetCard(cardId) {
  const dispatch = useDispatch();
  const { sourceCards, status } = useSelector((state) => state.cards);

  React.useEffect(() => {
    if (FETCH_STATUS.refetchReady(status)) {
      dispatch(initCards());
    }
  }, [dispatch, status]);

  return {
    card: sourceCards.find((card) => card.id === cardId) || cardNotFoundTemplate,
    status,
  };
}
