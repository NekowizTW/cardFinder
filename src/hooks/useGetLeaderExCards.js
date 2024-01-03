import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initCards } from '../actions/cardsActions';
import { FETCH_STATUS } from '../model/variables';

const getLeaderEXGroupLabel = ({ name, small_filename: smallFilename }) => {
  const nameWithRank = smallFilename.replace(/精靈大結晶_(.*)\.png/, '$1');
  const rank = nameWithRank.replace(name, '');

  return `${name}${rank.length > 0 ? `(${rank})` : ''}`;
};

export default function useGetLeaderExCards() {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const { sourceLeaderEXCards, status } = useSelector((state) => state.cards);
  const tokens = search.toUpperCase().split(' ').filter((token) => !!token);

  const leaderEXCards = React.useMemo(
    () => {
      const groups = sourceLeaderEXCards
        .filter(({ name, condition, skill }) => (
          tokens.length === 0
          || tokens.some(
            (token) => name.includes(token)
            || condition.includes(token)
            || skill.includes(token),
          )
        ))
        .reduce((acc, leaderEXCard) => {
          const label = getLeaderEXGroupLabel(leaderEXCard);

          if (!Object.prototype.hasOwnProperty.call(acc, label)) {
            acc[label] = [];
          }

          acc[label].push(leaderEXCard);

          return acc;
        }, {});

      return Object.entries(groups);
    },
    [sourceLeaderEXCards, tokens],
  );

  const triggerFilter = (value) => setSearch(value);

  React.useEffect(() => {
    if (FETCH_STATUS.refetchReady(status)) {
      dispatch(initCards());
    }
  }, [dispatch, status]);

  return {
    leaderEXCards,
    status,
    tokens,
    triggerFilter,
  };
}
