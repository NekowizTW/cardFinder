import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initCards } from '../actions/cardsActions';
import { FETCH_STATUS } from '../model/variables';

export default function useGetExCards() {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const { sourceSenzais, sourceEXCards, status } = useSelector((state) => state.cards);
  const tokens = search.toUpperCase().split(' ').filter((token) => !!token);

  // The filter should parse the information which is noted in its senzai.
  // So exCards should be mapped with senzai information, the the filter will be available to work.
  const exCards = React.useMemo(
    () => sourceEXCards
      .map((exCard) => {
        const {
          id, name, senzai_1: senzai1, small_filename: smallFilename, get_source: source,
        } = exCard;
        const senzai = sourceSenzais.find((sourceSenzai) => sourceSenzai.name === senzai1);

        return {
          id,
          name,
          description: senzai?.info || senzai1,
          smallFilename,
          source,
        };
      })
      .filter(({ name, description }) => (
        tokens.length === 0
        || tokens.some((token) => name.includes(token) || description.includes(token))
      )),
    [sourceEXCards, sourceSenzais, tokens],
  );

  const triggerFilter = (value) => setSearch(value);

  React.useEffect(() => {
    if (FETCH_STATUS.refetchReady(status)) {
      dispatch(initCards());
    }
  }, [dispatch, status]);

  return {
    exCards,
    status,
    tokens,
    triggerFilter,
  };
}
