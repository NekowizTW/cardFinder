import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterCards, initCards } from '../actions/cardsActions';
import { FETCH_STATUS } from '../model/variables';

export default function useGetFilteredCards() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { filteredCards, status } = useSelector((state) => state.cards);

  React.useEffect(() => {
    if (FETCH_STATUS.refetchReady(status)) {
      dispatch(initCards());
    } else {
      dispatch(filterCards());
    }
  }, [dispatch, filters, status]);

  return { filteredCards, status };
}
