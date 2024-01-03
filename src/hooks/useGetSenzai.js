import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initCards } from '../actions/cardsActions';
import { senzaiNotFoundTemplate } from '../model/NotFoundTemplates';
import { FETCH_STATUS } from '../model/variables';

export default function useGetSenzai(name) {
  const dispatch = useDispatch();
  const { sourceSenzais, status } = useSelector((state) => state.cards);

  React.useEffect(() => {
    if (FETCH_STATUS.refetchReady(status)) {
      dispatch(initCards());
    }
  }, [dispatch, status]);

  return {
    status,
    ...(sourceSenzais.find((card) => card.name === name) || senzaiNotFoundTemplate),
  };
}
