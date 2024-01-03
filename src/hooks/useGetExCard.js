import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initCards } from '../actions/cardsActions';
import { exCardNotFoundTemplate } from '../model/NotFoundTemplates';
import { FETCH_STATUS } from '../model/variables';

export default function useGetExCard(cardId) {
  const dispatch = useDispatch();
  const { sourceEXCards, status } = useSelector((state) => state.cards);

  React.useEffect(() => {
    if (FETCH_STATUS.refetchReady(status)) {
      dispatch(initCards());
    }
  }, [dispatch, status]);

  return {
    exCard: sourceEXCards.find((card) => card.id === cardId) || exCardNotFoundTemplate,
    status,
  };
}
