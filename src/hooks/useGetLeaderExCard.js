import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initCards } from '../actions/cardsActions';
import { leaderEXCardNotFoundTemplate } from '../model/NotFoundTemplates';
import { FETCH_STATUS } from '../model/variables';

export default function useGetLeaderExCard(leaderEX) {
  const dispatch = useDispatch();
  const { sourceLeaderEXCards, status } = useSelector((state) => state.cards);

  React.useEffect(() => {
    if (FETCH_STATUS.refetchReady(status)) {
      dispatch(initCards());
    }
  }, [dispatch, status]);

  return {
    ...(sourceLeaderEXCards.find(({ name, rank }) => `${name}${rank}` === leaderEX) || leaderEXCardNotFoundTemplate),
    status,
  };
}
